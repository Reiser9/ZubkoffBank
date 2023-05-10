import React from 'react';
import useRequest from './useRequest';
import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';

const useTransfer = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const {request} = useRequest();

    const getInfoBanks = async (phoneNum, successCallback = () => {}) => {
        setIsLoading(true);

        const data = await request(REQUEST_TYPE.USER, "/transfer/info_banks", HTTP_METHODS.POST, true, {phoneNum});

        setIsLoading(false);

        if(requestDataIsError(data)){
            setError(true);
        }
        // Ретурн

        successCallback();
    }

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

    return {
        isLoading,
        error,
        getInfoBanks,
        getInfoByPhone
    }
}

export default useTransfer;