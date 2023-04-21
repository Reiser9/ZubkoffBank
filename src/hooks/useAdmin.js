import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { REQUEST_STATUSES } from '../consts/REQUEST_STATUSES';
import useRequest, { HTTP_METHODS, REQUEST_TYPE } from './useRequest';
import useNotify, {NOTIFY_TYPES} from './useNotify';
import { initUsers, updateCard, updateUser } from '../redux/slices/admin';
import {addCardTypes} from '../redux/slices/cardTypes';

const useAdmin = () => {
    const [isLoad, setIsLoad] = React.useState(false);
    const [error, setError] = React.useState(false);

    const {users} = useSelector(state => state.admin);
    const dispatch = useDispatch();
    const {request} = useRequest();
    const {alertNotify, notifyTemplate} = useNotify();

    const getUsers = async () => {
        setIsLoad(true);

        if(Object.keys(users).length === 0){
            const data = await request(REQUEST_TYPE.ADMIN, "/users", HTTP_METHODS.GET, true);

            if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL || data.status === 500){
                setError(true);
            }
            else{
                dispatch(initUsers(data));
            }
        }

        setIsLoad(false);
    }

    const verifyUser = async (id, successCallback = () => {}) => {
        setIsLoad(true);

        const data = await request(REQUEST_TYPE.ADMIN, "/user/verify", HTTP_METHODS.POST, true, {id});

        setIsLoad(false);

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL || data.status === 500){
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
        setIsLoad(true);

        const data = await request(REQUEST_TYPE.ADMIN, "/card/block", HTTP_METHODS.POST, true, {id});

        setIsLoad(false);

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL || data.status === 500){
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
        setIsLoad(true);

        const data = await request(REQUEST_TYPE.ADMIN, "/card/unblock", HTTP_METHODS.POST, true, {id});

        setIsLoad(false);

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL || data.status === 500){
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
        setIsLoad(true);

        const data = await request(REQUEST_TYPE.ADMIN, "/user/block", HTTP_METHODS.POST, true, {id});

        setIsLoad(false);

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL || data.status === 500){
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
        setIsLoad(true);

        const data = await request(REQUEST_TYPE.ADMIN, "/user/unblock", HTTP_METHODS.POST, true, {id});

        setIsLoad(false);

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL || data.status === 500){
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
        setIsLoad(true);

        const data = await request(REQUEST_TYPE.ADMIN, "/card/type", HTTP_METHODS.POST, true, formData, {
            'Content-type': 'multipart/form-data'
        });

        setIsLoad(false);

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL || data.status === 500){
            setError(true);

            switch(data.error){
                case REQUEST_STATUSES.FILE_EXIST:
                    return alertNotify("Ошибка", "Карта с таким изображением уже существует", "error");
                default:
                    return notifyTemplate(NOTIFY_TYPES.ERROR);
            }
        }

        dispatch(addCardTypes(data));

        successCallback();
        alertNotify("Успешно", "Новый тип карты создан!", "success");
    }

    const rejectUserVerify = async (id, successCallback = () => {}) => {
        setIsLoad(true);

        const data = await request(REQUEST_TYPE.ADMIN, "/user/not_verify", HTTP_METHODS.POST, true, {id});

        setIsLoad(false);

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL || data.status === 500){
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
        setIsLoad(true);

        const data = await request(REQUEST_TYPE.ADMIN, "/user/role", HTTP_METHODS.POST, true, {
            id,
            roleId
        });

        setIsLoad(false);

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL || data.status === 500){
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
        setIsLoad(true);

        const data = await request(REQUEST_TYPE.ADMIN, "/user/role", HTTP_METHODS.PATCH, true, {
            id,
            roleId
        });

        setIsLoad(false);

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL || data.status === 500){
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
        setIsLoad(true);

        const data = await request(REQUEST_TYPE.ADMIN, "/user/balance", HTTP_METHODS.POST, true, {
            id,
            balance
        });

        setIsLoad(false);

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL || data.status === 500){
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