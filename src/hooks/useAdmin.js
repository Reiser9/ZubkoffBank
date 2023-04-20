import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { REQUEST_STATUSES } from '../consts/REQUEST_STATUSES';
import useRequest, { HTTP_METHODS, REQUEST_TYPE } from './useRequest';
import useNotify from './useNotify';
import { initUsers, updateCard, updateUser } from '../redux/slices/admin';

const useAdmin = () => {
    const [isLoad, setIsLoad] = React.useState(false);
    const [error, setError] = React.useState(false);

    const {users} = useSelector(state => state.admin);
    const dispatch = useDispatch();
    const {request} = useRequest();
    const {alertNotify} = useNotify();

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

    const verifyUser = async (id) => {
        setIsLoad(true);

        const data = await request(REQUEST_TYPE.ADMIN, "/user/verify", HTTP_METHODS.POST, true, {
            id
        });

        setIsLoad(false);

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL){
            return setError(true);
        }

        dispatch(updateUser({id, data}));

        alertNotify("Успешно", "Пользователь верифицирован", "success");
    }

    const blockCard = async (id, userId) => {
        setIsLoad(true);

        const data = await request(REQUEST_TYPE.ADMIN, "/card/block", HTTP_METHODS.POST, true, {
            id
        });

        setIsLoad(false);

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL){
            alertNotify("Ошибка", "Что-то пошло не так", "error");
            return setError(true);
        }

        dispatch(updateCard({id, userId, data}));

        alertNotify("Успешно", "Карта заблокирована", "success");
    }

    const unblockCard = async (id, userId) => {
        setIsLoad(true);

        const data = await request(REQUEST_TYPE.ADMIN, "/card/unblock", HTTP_METHODS.POST, true, {
            id
        });

        setIsLoad(false);

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL){
            alertNotify("Ошибка", "Что-то пошло не так", "error");
            return setError(true);
        }

        dispatch(updateCard({id, userId, data}));

        alertNotify("Успешно", "Карта разблокирована", "success");
    }

    const blockUser = async (id) => {
        setIsLoad(true);

        const data = await request(REQUEST_TYPE.ADMIN, "/user/block", HTTP_METHODS.POST, true, {
            id
        });

        setIsLoad(false);

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL){
            alertNotify("Ошибка", "Что-то пошло не так", "error");
            return setError(true);
        }

        dispatch(updateUser({id, data}));

        alertNotify("Успешно", "Пользователь заблокирован", "success");
    }

    const unblockUser = async (id) => {
        setIsLoad(true);

        const data = await request(REQUEST_TYPE.ADMIN, "/user/unblock", HTTP_METHODS.POST, true, {
            id
        });

        setIsLoad(false);

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL){
            alertNotify("Ошибка", "Что-то пошло не так", "error");
            return setError(true);
        }

        dispatch(updateUser({id, data}));

        alertNotify("Успешно", "Пользователь разблокирован", "success");
    }

    const createTypeCard = async (formData) => {
        setIsLoad(true);

        const data = await request(REQUEST_TYPE.ADMIN, "/card/type", HTTP_METHODS.POST, true, formData);

        setIsLoad(false);

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL || data.status === 500){
            switch(data.error){
                case REQUEST_STATUSES.FILE_EXIST:
                    alertNotify("Ошибка", "Карта с таким изображением уже существует", "error");
                    break;
                default:
                    alertNotify("Ошибка", "Что-то пошло не так", "error");
                    break;
            }

            setError(true);
            return "Ошибка";
        }

        alertNotify("Успешно", "Новый тип карты создан!", "success");
    }

    return {isLoad, error, getUsers, verifyUser, blockCard, unblockCard, blockUser, unblockUser, createTypeCard}
}

export default useAdmin;