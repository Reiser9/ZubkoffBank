import React from 'react';
import { useDispatch } from 'react-redux';

import useRequest, { HTTP_METHODS, REQUEST_TYPE } from './useRequest';
import { REQUEST_STATUSES } from '../consts/REQUEST_STATUSES';
import useNotify, { NOTIFY_TYPES } from './useNotify';
import { initCardTypes } from '../redux/slices/cardTypes';
import { initUsers } from '../redux/slices/admin';

const usePaggination = () => {
    const [isLoad, setIsLoad] = React.useState(false);
    const [error, setError] = React.useState(false);

    const {request} = useRequest();
    const {notifyTemplate} = useNotify();
    const dispatch = useDispatch();

    const changePagginationCards = async (page, limit) => {
        setIsLoad(true);

        const data = await request(REQUEST_TYPE.CARD, `/types?offset=${page}&limit=${limit}`, HTTP_METHODS.GET);

        setIsLoad(false);

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL || data.status === 500){
            setError(true);

            switch(data.error){
                default:
                    return notifyTemplate(NOTIFY_TYPES.ERROR);
            }
        }

        dispatch(initCardTypes(data));
    }

    const changePagginationUsers = async (page, limit) => {
        setIsLoad(true);

        const data = await request(REQUEST_TYPE.ADMIN, `/users?offset=${page}&limit=${limit}`, HTTP_METHODS.GET, true);

        setIsLoad(false);

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL || data.status === 500){
            setError(true);

            switch(data.error){
                default:
                    return notifyTemplate(NOTIFY_TYPES.ERROR);
            }
        }

        dispatch(initUsers(data));
    }

    const changeLimitUsers = async (page, limit) => {
        setIsLoad(true);

        const data = await request(REQUEST_TYPE.ADMIN, `/users?offset=${page}&limit=${limit}`, HTTP_METHODS.GET, true);

        setIsLoad(false);

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL || data.status === 500){
            setError(true);

            switch(data.error){
                default:
                    return notifyTemplate(NOTIFY_TYPES.ERROR);
            }
        }

        dispatch(initUsers(data));
    }

    return {
        isLoad,
        error,
        changePagginationCards,
        changePagginationUsers,
        changeLimitUsers
    }
}

export default usePaggination;