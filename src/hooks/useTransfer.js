import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useRequest from './useRequest';
import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';
import { requestDataIsError } from '../utils/requestDataIsError';
import {NOTIFY_TYPES} from '../consts/NOTIFY_TYPES';
import useNotify from '../hooks/useNotify';
import { initTransfersHistory } from '../redux/slices/user';
import { initInfoBanks, initInfoTransfer, addInfoTransfer } from '../redux/slices/transfers';

const useTransfer = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const {cards} = useSelector(state => state.user);
    const dispatch = useDispatch();

    const {request} = useRequest();
    const {alertNotify, notifyTemplate} = useNotify();

    // Получить информацию о пользователе по номеру телефона
    const getInfoTransfer = async ({phoneNum, cardNum, code}) => {
        setIsLoading(true);

        let params = {
            code
        }

        if(phoneNum){
            params = {
                ...params,
                phoneNum
            }
        }
        else{
            params = {
                ...params,
                cardNum
            }
        }

        const data = await request(REQUEST_TYPE.USER, "/transfer/info", HTTP_METHODS.POST, true, params);

        setIsLoading(false);

        if(requestDataIsError(data)){
            return setError(true);
        }

        return data;
    }

    // Получить по номеру телефона все банки пользователя
    const getInfoBanks = async (phoneNum, successCallback = () => {}) => {
        setIsLoading(true);

        const data = await request(REQUEST_TYPE.USER, "/transfer/info_banks", HTTP_METHODS.POST, true, {phoneNum});

        setIsLoading(false);

        if(requestDataIsError(data)){
            setError(true);

            switch(data.error){
                default:
                    return notifyTemplate(NOTIFY_TYPES.ERROR);
            }
        }

        dispatch(initInfoBanks(data));
        dispatch(initInfoTransfer([]));

        for(let item of data){
            const infoTransfer = await getInfoTransfer({phoneNum, code: item.code});

            if(infoTransfer){
                dispatch(addInfoTransfer(infoTransfer));
            }
        }

        successCallback();
    }

    // Получить историю платежей по карте
    const getTransfersHistory = async (id, page = 0, limit = 10) => {
        setIsLoading(true);

        const indexCard = cards.findIndex(item => item.id === id);

        if(!cards[indexCard].transfers){
            const data = await request(REQUEST_TYPE.USER, `/transfers?id=${id}&offset=${page}&limit=${limit}`, HTTP_METHODS.GET, true);

            if(requestDataIsError(data)){
                setError(true);
            }
            else{
                dispatch(initTransfersHistory({id, data}));
            }
        }

        setIsLoading(false);
    }

    // Получить код для платежа свыше 100 000 рублей
    const getConfirmTransferCode = async (successCallback = () => {}) => {
        setIsLoading(true);

        const data = await request(REQUEST_TYPE.USER, "/transfer/code", HTTP_METHODS.POST, true);

        setIsLoading(false);

        if(requestDataIsError(data)){
            setError(true);
        }

        successCallback();
    }

    // Отправить перевод
    const sendTransfer = async ({money, cardNum, destOrganization, destCode, destPhoneNum = "", destCardNum = "", message = "", code = "", successCallback = () => {}}) => {
        setIsLoading(true);

        let paymentInfo = {
            money,
            cardNum,
            destOrganization,
            destCode,
            message
        }

        if(destPhoneNum){
            paymentInfo = {
                ...paymentInfo,
                destPhoneNum
            }
        }
        else{
            paymentInfo = {
                ...paymentInfo,
                destCardNum
            }
        }

        if(code){
            paymentInfo = {
                ...paymentInfo,
                code
            }
        }

        const data = await request(REQUEST_TYPE.USER, "/transfer", HTTP_METHODS.POST, true, paymentInfo);

        setIsLoading(false);

        if(requestDataIsError(data)){
            setError(true);

            switch(data.error){
                default:
                    return notifyTemplate(NOTIFY_TYPES.ERROR);
            }
        }

        successCallback();
        alertNotify("Успешно", "Перевод выполнен", "success");
    }

    return {
        isLoading,
        error,
        getInfoBanks,
        getInfoTransfer,
        getTransfersHistory,
        getConfirmTransferCode,
        sendTransfer
    }
}

export default useTransfer;