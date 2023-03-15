import React from 'react';
import { useSelector } from 'react-redux';

import {BASE_API_URL_USER, BASE_API_URL_ADMIN, BASE_API_URL_AUTH} from '../consts/API_URLS';

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
    AUTH: 'auth'
};

const useRequest = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const authInfo = useSelector(state => state.auth);
    const accessToken = window.sessionStorage.getItem("accessToken") || authInfo.accessToken;
    const typeToken = window.sessionStorage.getItem("typeToken") || authInfo.typeToken;

    const userRequest = axios.create({
        baseURL: BASE_API_URL_USER
    });

    const adminRequest = axios.create({
        baseURL: BASE_API_URL_ADMIN
    });

    const authRequest = axios.create({
        baseURL: BASE_API_URL_AUTH
    });

    const axiosInstancesMap = new Map([
        [REQUEST_TYPE.AUTH, authRequest],
        [REQUEST_TYPE.ADMIN, adminRequest],
        [REQUEST_TYPE.USER, userRequest]
    ]);

    const request = async ({
        requestType = REQUEST_TYPE.USER,
        url,
        method = HTTP_METHODS.GET,
        isAuth = false,
        data = {},
        headers = {}
    }) => {
        setIsLoading(true);

        const axiosInstance = axiosInstancesMap.get(requestType);

        let reqHeaders = headers;

        if(isAuth){
            reqHeaders = {
                ...reqHeaders,
                'Authorization': `${typeToken} ${accessToken}`
            }
        }

        try{
            const reqHeaders = {
                'Content-Type': 'application/json',
                ...headers,
            };

            const response = await axiosInstance.request({
                method,
                url,
                headers: reqHeaders,
                data
            });

            setIsLoading(false);

            return {
                data: response.data
            };
        }
        catch(err){
            console.log(err);
            setError(true);
            setIsLoading(false);
        }
    }

    return {isLoading, error, request};
}

export default useRequest;