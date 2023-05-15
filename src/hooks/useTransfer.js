import React from 'react';

import useRequest from './useRequest';
import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';
import { requestDataIsError } from '../utils/requestDataIsError';
import {NOTIFY_TYPES} from '../consts/NOTIFY_TYPES';
import useNotify from '../hooks/useNotify';

const useTransfer = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const {request} = useRequest();
    const {notifyTemplate} = useNotify();

    // Получить по номеру телефона все банки пользователя
    const getInfoBanks = async (phoneNum, successCallback = () => {}) => {
        setIsLoading(true);

        const data = await request(REQUEST_TYPE.USER, "/transfer/info_banks", HTTP_METHODS.POST, true, {phoneNum});

        setIsLoading(false);

        console.log(data);

        if(requestDataIsError(data)){
            setError(true);

            switch(data.error){
                default:
                    return notifyTemplate(NOTIFY_TYPES.ERROR);
            }
        }
        // Ретурн

        successCallback();
    }

    // Получить информацию о пользователе по номеру телефона
    const getInfoByPhone = async (phoneNum, code, successCallback = () => {}) => {
        setIsLoading(true);

        const data = await request(REQUEST_TYPE.USER, "/transfer/info_phone", HTTP_METHODS.POST, true, {phoneNum, code});

        setIsLoading(false);

        if(requestDataIsError(data)){
            setError(true);
        }
        // Ретурн

        successCallback();
    }

    // Получить историю платежей по карте
    const getTransfersHistory = async (id, successCallback = () => {}) => {
        setIsLoading(true);

        const data = await request(REQUEST_TYPE.USER, "/transfers", HTTP_METHODS.GET, true, {
            params: {
                id
            }
        });

        setIsLoading(false);

        if(requestDataIsError(data)){
            setError(true);
        }

        successCallback();
        console.log(data);
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
    }

    return {
        isLoading,
        error,
        getInfoBanks,
        getInfoByPhone,
        getTransfersHistory,
        getConfirmTransferCode,
        sendTransfer
    }
}

export default useTransfer;