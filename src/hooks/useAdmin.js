import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NOTIFY_TYPES } from '../consts/NOTIFY_TYPES';
import { REQUEST_STATUSES } from '../consts/REQUEST_STATUSES';
import useRequest from './useRequest';
import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';
import useNotify from './useNotify';
import { initUsers, updateCard, updateUser, initCardTypes, addCardTypesPaggination, getCardTypesPaggination, addUsersPaggination, getUsersPaggination } from '../redux/slices/admin';
import {addCardTypes} from '../redux/slices/admin';
import { requestDataIsError } from '../utils/requestDataIsError';

const useAdmin = () => {
    const [isLoad, setIsLoad] = React.useState(false);
    const [error, setError] = React.useState(false);

    const {users, usersPagin, cardTypes, cardTypesPagin} = useSelector(state => state.admin);
    const dispatch = useDispatch();
    const {request} = useRequest();
    const {alertNotify, notifyTemplate} = useNotify();

    const getUsers = async (page = 0, limit = 10, reload = false) => {
        setError(false);
        setIsLoad(true);

        if(Object.keys(users).length !== 0 && users.content[page * limit] !== null && users.content[(page + 1) * limit - 1] !== null && !reload){
            setIsLoad(false);

            if(usersPagin.page === page && usersPagin.size !== limit){
                if(users.content[0] !== null && users.content[limit - 1] !== null){
                    return dispatch(getUsersPaggination({page: 0, limit}));
                }
                    
                return getUsers(0, limit);
            }

            return dispatch(getUsersPaggination({page, limit}));
        }

        const data = await request(REQUEST_TYPE.ADMIN, `/users?offset=${page}&limit=${limit}`, HTTP_METHODS.GET, true);

        setIsLoad(false);

        if(requestDataIsError(data)){
            return setError(true);
        }
        
        if(Object.keys(users).length !== 0 && !reload){
            return dispatch(addUsersPaggination({page, limit, data}));
        }
            
        dispatch(initUsers(data));
    }

    const getCardTypes = async (page = 0, limit = 10, reload = false) => {
        setError(false);
        setIsLoad(true);

        if(Object.keys(cardTypes).length !== 0 && cardTypes.content[page * limit] !== null && cardTypes.content[(page + 1) * limit - 1] !== null && !reload){
            setIsLoad(false);

            if(cardTypesPagin.page === page && cardTypesPagin.size !== limit){
                if(cardTypes.content[0] !== null && cardTypes.content[limit - 1] !== null){
                    return dispatch(getCardTypesPaggination({page: 0, limit}));
                }
                
                return getUsers(0, limit);
            }

            return dispatch(getCardTypesPaggination({page, limit}));
        }

        const data = await request(REQUEST_TYPE.CARD, `/types?offset=${page}&limit=${limit}`, HTTP_METHODS.GET);

        if(requestDataIsError(data)){
            return setError(true);
        }
        
        if(Object.keys(cardTypes).length !== 0 && !reload){
            return dispatch(addCardTypesPaggination({page, limit, data}));
        }
  
        dispatch(initCardTypes(data));
        setIsLoad(false);
    }

    const verifyUser = async (id, successCallback = () => {}) => {
        setError(false);
        setIsLoad(true);

        const data = await request(REQUEST_TYPE.ADMIN, "/user/verify", HTTP_METHODS.POST, true, {id});

        setIsLoad(false);

        if(requestDataIsError(data)){
            setError(true);

            switch(data.error){
                default:
                    return notifyTemplate(NOTIFY_TYPES.ERROR);
            }
        }

        dispatch(updateUser({id, data}));

        successCallback();
        alertNotify("Успешно", "Пользователь верифицирован", "success");
    }

    const blockCard = async (id, userId, successCallback = () => {}) => {
        setError(false);
        setIsLoad(true);

        const data = await request(REQUEST_TYPE.ADMIN, "/card/block", HTTP_METHODS.POST, true, {id});

        setIsLoad(false);

        if(requestDataIsError(data)){
            setError(true);

            switch(data.error){
                default:
                    return notifyTemplate(NOTIFY_TYPES.ERROR);
            }
        }

        dispatch(updateCard({id, userId, data}));

        successCallback();
        alertNotify("Успешно", "Карта заблокирована", "success");
    }

    const unblockCard = async (id, userId, successCallback = () => {}) => {
        setError(false);
        setIsLoad(true);

        const data = await request(REQUEST_TYPE.ADMIN, "/card/unblock", HTTP_METHODS.POST, true, {id});

        setIsLoad(false);

        if(requestDataIsError(data)){
            setError(true);

            switch(data.error){
                default:
                    return notifyTemplate(NOTIFY_TYPES.ERROR);
            }
        }

        dispatch(updateCard({id, userId, data}));

        successCallback();
        alertNotify("Успешно", "Карта разблокирована", "success");
    }

    const blockUser = async (id, successCallback = () => {}) => {
        setError(false);
        setIsLoad(true);

        const data = await request(REQUEST_TYPE.ADMIN, "/user/block", HTTP_METHODS.POST, true, {id});

        setIsLoad(false);

        if(requestDataIsError(data)){
            setError(true);

            switch(data.error){
                default:
                    return notifyTemplate(NOTIFY_TYPES.ERROR);
            }
        }

        dispatch(updateUser({id, data}));

        successCallback();
        alertNotify("Успешно", "Пользователь заблокирован", "success");
    }

    const unblockUser = async (id, successCallback = () => {}) => {
        setError(false);
        setIsLoad(true);

        const data = await request(REQUEST_TYPE.ADMIN, "/user/unblock", HTTP_METHODS.POST, true, {id});

        setIsLoad(false);

        if(requestDataIsError(data)){
            setError(true);

            switch(data.error){
                default:
                    return notifyTemplate(NOTIFY_TYPES.ERROR);
            }
        }

        dispatch(updateUser({id, data}));

        successCallback();
        alertNotify("Успешно", "Пользователь разблокирован", "success");
    }

    const createTypeCard = async (formData, successCallback = () => {}) => {
        setError(false);
        setIsLoad(true);

        const data = await request(REQUEST_TYPE.ADMIN, "/card/type", HTTP_METHODS.POST, true, formData, {
            'Content-type': 'multipart/form-data'
        });

        setIsLoad(false);

        if(requestDataIsError(data)){
            setError(true);

            switch(data.error){
                case REQUEST_STATUSES.FILE_EXIST:
                    return alertNotify("Ошибка", "Карта с таким именем/изображением уже существует", "error");
                default:
                    return notifyTemplate(NOTIFY_TYPES.ERROR);
            }
        }

        dispatch(addCardTypes(data));

        successCallback();
        alertNotify("Успешно", "Новый тип карты создан!", "success");
    }

    const rejectUserVerify = async (id, successCallback = () => {}) => {
        setError(false);
        setIsLoad(true);

        const data = await request(REQUEST_TYPE.ADMIN, "/user/not_verify", HTTP_METHODS.POST, true, {id});

        setIsLoad(false);

        if(requestDataIsError(data)){
            setError(true);

            switch(data.error){
                default:
                    return notifyTemplate(NOTIFY_TYPES.ERROR);
            }
        }

        dispatch(updateUser({id, data}));

        successCallback();
        alertNotify("Успешно", "Данные верификации отклонены", "success");
    }

    const addRole = async (id, roleId, successCallback = () => {}) => {
        setError(false);
        setIsLoad(true);

        const data = await request(REQUEST_TYPE.ADMIN, "/user/role", HTTP_METHODS.POST, true, {
            id,
            roleId
        });

        setIsLoad(false);

        if(requestDataIsError(data)){
            setError(true);

            switch(data.error){
                default:
                    return notifyTemplate(NOTIFY_TYPES.ERROR);
            }
        }

        dispatch(updateUser({id, data}));

        successCallback();
        alertNotify("Успешно", "Роль добавлена", "success");
    }

    const removeRole = async (id, roleId, successCallback = () => {}) => {
        setError(false);
        setIsLoad(true);

        const data = await request(REQUEST_TYPE.ADMIN, "/user/role", HTTP_METHODS.PATCH, true, {
            id,
            roleId
        });

        setIsLoad(false);

        if(requestDataIsError(data)){
            setError(true);

            switch(data.error){
                default:
                    return notifyTemplate(NOTIFY_TYPES.ERROR);
            }
        }

        dispatch(updateUser({id, data}));

        successCallback();
        alertNotify("Успешно", "Роль удалена", "success");
    }

    const changeBalance = async (id, balance, userId, successCallback = () => {}) => {
        setError(false);
        setIsLoad(true);

        const data = await request(REQUEST_TYPE.ADMIN, "/user/balance", HTTP_METHODS.POST, true, {
            id,
            balance
        });

        setIsLoad(false);

        if(requestDataIsError(data)){
            setError(true);

            switch(data.error){
                default:
                    return notifyTemplate(NOTIFY_TYPES.ERROR);
            }
        }

        dispatch(updateCard({id, userId, data}));

        successCallback();
        alertNotify("Успешно", "Баланс карты изменен", "success");
    }

    return {
        isLoad,
        error,
        getUsers,
        getCardTypes,
        verifyUser,
        blockCard,
        unblockCard,
        blockUser,
        unblockUser,
        createTypeCard,
        rejectUserVerify,
        addRole,
        removeRole,
        changeBalance
    }
}

export default useAdmin;