import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import {BASE_API_URL_USER, BASE_API_URL_ADMIN, BASE_API_URL_AUTH, BASE_API_URL_EMPTY, BASE_API_URL_CARD} from '../consts/API_URLS';
import {REQUEST_STATUSES} from '../consts/REQUEST_STATUSES';

import {setIsServerAvailable} from '../redux/slices/server';
import {isBot} from '../utils/isBot';

export const HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH'
};

export const REQUEST_TYPE = {
    USER: 'user',
    ADMIN: 'admin',
    AUTH: 'auth',
    CARD: 'card',
    EMPTY: 'empty'
};

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
        try{
            await emptyRequest.get("/health", {
                timeout: 5000
            });
        }catch(error){
            dispatch(setIsServerAvailable(false));

            return REQUEST_STATUSES.SITE_NOT_AVAILABLE;
        }
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

        if(!isServerAvailable){
            return REQUEST_STATUSES.SITE_NOT_AVAILABLE;
        }

        setError(false);
        setIsLoading(true);

        const accessToken = localStorage.getItem("accessToken");
        const typeToken = localStorage.getItem("typeToken");

        const axiosInstance = axiosInstancesMap.get(requestType);

        let reqHeaders = {
            ...headers,
            'Content-Type': 'application/json'
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

            console.log(response.data); // <--
            return response.data;
        }
        catch(err){
            const serverHealth = await getHealthServer();

            setError(true);
            setIsLoading(false);

            if(serverHealth === REQUEST_STATUSES.SITE_NOT_AVAILABLE){
                return serverHealth;
            }
            
            console.log(err.response.data); // <--
            return err.response.data;
        }
    }, [isServerAvailable]);

    return {isLoading, error, request, getHealthServer};
}

export default useRequest;