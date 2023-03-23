import React from 'react';
import axios from 'axios';

import {BASE_API_URL_USER, BASE_API_URL_ADMIN, BASE_API_URL_AUTH, BASE_API_URL_EMPTY} from '../consts/API_URLS';

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
    EMPTY: 'empty'
};

const useRequest = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const userRequest = axios.create({
        baseURL: BASE_API_URL_USER
    });

    const adminRequest = axios.create({
        baseURL: BASE_API_URL_ADMIN
    });

    const authRequest = axios.create({
        baseURL: BASE_API_URL_AUTH
    });

    const emptyRequest = axios.create({
        baseURL: BASE_API_URL_EMPTY
    });

    const axiosInstancesMap = new Map([
        [REQUEST_TYPE.AUTH, authRequest],
        [REQUEST_TYPE.ADMIN, adminRequest],
        [REQUEST_TYPE.USER, userRequest],
        [REQUEST_TYPE.EMPTY, emptyRequest]
    ]);

    const request = async (
        requestType = REQUEST_TYPE.USER,
        url,
        method = HTTP_METHODS.GET,
        isAuth = false,
        data = {},
        headers = {}
    ) => {
        setError(false);
        setIsLoading(true);

        const accessToken = localStorage.getItem("accessToken");
        const typeToken = localStorage.getItem("typeToken");

        const axiosInstance = axiosInstancesMap.get(requestType);

        let reqHeaders = headers;

        if(isAuth){
            reqHeaders = {
                ...reqHeaders,
                'Authorization': `${typeToken} ${accessToken}`
            }
        }

        try{
            reqHeaders = {
                'Content-Type': 'application/json',
                ...reqHeaders,
            };

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
            // ПРОВЕРЯТЬ ЕСЛИ ЛЕЖИТ СЕРВЕР ОТСЫЛАТЬ СООТВЕТСТВУЮЩУЮ ОШИБКУ
            setError(true);
            setIsLoading(false);

            return err.response.data;
        }
    };

    return {isLoading, error, request};
}

export default useRequest;