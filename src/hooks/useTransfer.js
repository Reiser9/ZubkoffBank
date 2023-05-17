import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useRequest from './useRequest';
import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';
import { requestDataIsError } from '../utils/requestDataIsError';
import {NOTIFY_TYPES} from '../consts/NOTIFY_TYPES';
import useNotify from '../hooks/useNotify';
import { initTransfersHistory } from '../redux/slices/user';
import { initInfoBanks, initInfoTransfer, addInfoTransfer } from '../redux/slices/transfers';
import { REQUEST_STATUSES } from '../consts/REQUEST_STATUSES';

const useTransfer = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const {cards} = useSelector(state => state.user);
    const dispatch = useDispatch();

    const {request} = useRequest();
    const {alertNotify, notifyTemplate} = useNotify();

    // Получить информацию о пользователе по номеру телефона/номеру карты
    const getInfoTransfer = async ({phoneNum, cardNum, code, successCallback = () => {}}) => {
        setError(false);
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

        successCallback();
        return data;
    }

    const getInfoByCard = async (cardNum, successCallback = () => {}) => {
        setError(false);
        setIsLoading(true);

        const data = await getInfoTransfer({cardNum, code: process.env.REACT_APP_BANK_CODE});

        setIsLoading(false);

        if(!data){
            return setError(true);
        }

        dispatch(initInfoTransfer([]));

        dispatch(addInfoTransfer({
            ...data,
            code: process.env.REACT_APP_BANK_CODE
        }));

        successCallback();
    }

    // Получить по номеру телефона все банки пользователя
    const getInfoBanks = async (phoneNum, successCallback = () => {}) => {
        setError(false);
        setIsLoading(true);

        const data = await request(REQUEST_TYPE.USER, "/transfer/info_banks", HTTP_METHODS.POST, true, {phoneNum});

        if(requestDataIsError(data)){
            setError(true);
            setIsLoading(false);

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
                dispatch(addInfoTransfer({
                    ...infoTransfer,
                    code: item.code
                }));
            }
        }

        setIsLoading(false);

        successCallback();
    }

    // Получить историю платежей по карте
    const getTransfersHistory = async (id, reload = false) => {
        setError(false);
        setIsLoading(true);

        const indexCard = cards.findIndex(item => item.id === id);

        if(!cards[indexCard].transfers || reload){
            const data = await request(REQUEST_TYPE.USER, `/transfers?id=${id}`, HTTP_METHODS.GET, true);

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
        setError(false);
        setIsLoading(true);

        const data = await request(REQUEST_TYPE.USER, "/transfer/code", HTTP_METHODS.POST, true);

        setIsLoading(false);

        if(requestDataIsError(data)){
            setError(true);
        }

        successCallback();
        alertNotify("Подтверждение", "Введите код для подтверждения платежа", "info");
    }

    // Отправить перевод
    const sendTransfer = async ({money, cardNum, destOrganization, destCode, destPhoneNum = "", destCardNum = "", message = "", confirmCode = ""}, successCallback = () => {}) => {
        setError(false);
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

        if(confirmCode){
            paymentInfo = {
                ...paymentInfo,
                codeConfirm: confirmCode
            }
        }

        const data = await request(REQUEST_TYPE.USER, "/transfer/", HTTP_METHODS.POST, true, paymentInfo);

        setIsLoading(false);

        if(requestDataIsError(data)){
            setError(true);

            switch(data.error){
                case REQUEST_STATUSES.INSUFFICIENT_FUNDS:
                    return alertNotify("Ошибка", "Недостаточно средств на карте", "error");
                case REQUEST_STATUSES.NOT_SUBSCRIBE:
                    return alertNotify("Ошибка", "Получатель не подключен к СБП", "error");
                case REQUEST_STATUSES.MESSAGE_LONG:
                    return alertNotify("Ошибка", "Комментарий слишком длинный", "error");
                default:
                    return notifyTemplate(NOTIFY_TYPES.ERROR);
            }
        }

        successCallback();
        alertNotify("Успешно", "Перевод выполнен", "success");
    }

    const checkComission = async () => {
        setError(false);
        setIsLoading(true);

        const data = request(REQUEST_TYPE.USER, "/transfer/commission", HTTP_METHODS.POST, true);

        setIsLoading(false);

        if(requestDataIsError(data)){
            setError(true);
            return;
        }

        return data.commission;
    }

    return {
        isLoading,
        error,
        getInfoBanks,
        getInfoTransfer,
        getTransfersHistory,
        getConfirmTransferCode,
        sendTransfer,
        checkComission,
        getInfoByCard
    }
}

export default useTransfer;