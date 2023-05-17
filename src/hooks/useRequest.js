import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import {BASE_API_URL_USER, BASE_API_URL_ADMIN, BASE_API_URL_AUTH, BASE_API_URL_EMPTY, BASE_API_URL_CARD} from '../consts/API_URLS';
import {REQUEST_STATUSES} from '../consts/REQUEST_STATUSES';
import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';

import {setIsServerAvailable} from '../redux/slices/server';
import {setBlocked} from '../redux/slices/app';
import {isBot} from '../utils/isBot';
import {requestDataIsError} from '../utils/requestDataIsError';

const useRequest = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const dispatch = useDispatch();
    const {isServerAvailable} = useSelector(state => state.server);

    const userRequest = axios.create({
        baseURL: BASE_API_URL_USER
    });

    const adminRequest = axios.create({
        baseURL: BASE_API_URL_ADMIN
    });

    const authRequest = axios.create({
        baseURL: BASE_API_URL_AUTH
    });

    const cardRequest = axios.create({
        baseURL: BASE_API_URL_CARD
    });

    const emptyRequest = axios.create({
        baseURL: BASE_API_URL_EMPTY
    });

    const axiosInstancesMap = new Map([
        [REQUEST_TYPE.AUTH, authRequest],
        [REQUEST_TYPE.ADMIN, adminRequest],
        [REQUEST_TYPE.USER, userRequest],
        [REQUEST_TYPE.CARD, cardRequest],
        [REQUEST_TYPE.EMPTY, emptyRequest]
    ]);

    const getHealthServer = async () => {
        if(isBot()){
            return;
        }
        
        try{
            await emptyRequest.get("/health", {
                timeout: 5000
            });
        }catch(error){
            dispatch(setIsServerAvailable(false));

            return REQUEST_STATUSES.SITE_NOT_AVAILABLE;
        }
    }

    // Получить новые токены
    const getNewTokens = async (refreshToken) => {
        const newTokens = await request(REQUEST_TYPE.AUTH, "/refresh", HTTP_METHODS.POST, false, {refreshToken});
            
        if(requestDataIsError(newTokens)){
            return;
        }

        localStorage.setItem("accessToken", newTokens.accessToken);
        localStorage.setItem("refreshToken", newTokens.refreshToken);
        localStorage.setItem("typeToken", newTokens.typeToken);

        return newTokens;
    }

    const checkAccessDenied = async () => {
        const refreshToken = localStorage.getItem("refreshToken");

        await getNewTokens(refreshToken);
    }

    const request = React.useCallback(async (
        requestType = REQUEST_TYPE.USER,
        url,
        method = HTTP_METHODS.GET,
        isAuth = false,
        data = {},
        headers = {}
    ) => {
        if(isBot()){
            return;
        }

        setError(false);
        setIsLoading(true);

        const accessToken = localStorage.getItem("accessToken");
        const typeToken = localStorage.getItem("typeToken");

        const axiosInstance = axiosInstancesMap.get(requestType);

        let reqHeaders = {
            'Content-Type': 'application/json',
            ...headers
        }

        if(isAuth){
            reqHeaders = {
                ...reqHeaders,
                'Authorization': `${typeToken} ${accessToken}`
            }
        }

        try{
            const response = await axiosInstance.request({
                method,
                url,
                headers: reqHeaders,
                data
            });

            setIsLoading(false);

            return response.data;
        }
        catch(err){
            const error = err.response;

            const serverHealth = await getHealthServer();

            setError(true);
            setIsLoading(false);

            if(serverHealth === REQUEST_STATUSES.SITE_NOT_AVAILABLE){
                return serverHealth;
            }
            
            if(error.data.error === REQUEST_STATUSES.YOU_ARE_BLOCKED){
                dispatch(setBlocked(true));
            }

            if(error.data.error === "Forbidden" && error.data.status === 403){
                checkAccessDenied();

                return REQUEST_STATUSES.TOKEN_EXPIRED;
            }

            return error.data;
        }
    }, [isServerAvailable]);

    return {isLoading, error, request, getHealthServer, checkAccessDenied, getNewTokens};
}

export default useRequest;