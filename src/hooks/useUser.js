import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NOTIFY_TYPES } from '../consts/NOTIFY_TYPES';
import { REQUEST_STATUSES } from '../consts/REQUEST_STATUSES';
import { REQUEST_TYPE, HTTP_METHODS } from '../consts/HTTP';
import useRequest from './useRequest';
import useNotify from './useNotify';
import { getNormalDate } from '../utils/getNormalDate';

import { updateUser, setUserIsLoading, initCards, addCards, updateCard, initSubscribes, removeCard, reissueCard } from '../redux/slices/user';
import { requestDataIsError } from '../utils/requestDataIsError';

const useUser = () => {
    const [error, setError] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const dispatch = useDispatch();
    const {request} = useRequest();
    const {user, cards} = useSelector(state => state.user);
    const {alertNotify, notifyTemplate} = useNotify();

    // Получить короткую информацию пользователя
    const getUserShortInfo = async () => {
        setError(false);
        dispatch(setUserIsLoading(true));

        const data = await request(REQUEST_TYPE.USER, "/short_info", HTTP_METHODS.GET, true);

        dispatch(setUserIsLoading(false));

        if(data.status !== REQUEST_STATUSES.NOT_SUCCESSFUL && data !== REQUEST_STATUSES.SITE_NOT_AVAILABLE && data.status !== 403){
            dispatch(updateUser(data));
        }

        return data;
    }

    // Получить полную информацию пользователя
    const getUserFullInfo = async () => {
        setError(false);
        if(user.secondName){
            return;
        }

        dispatch(setUserIsLoading(true));

        const data = await request(REQUEST_TYPE.USER, "/full_info", HTTP_METHODS.GET, true);

        dispatch(setUserIsLoading(false));

        if(requestDataIsError(data)){
            return setError(true);
        }

        dispatch(updateUser(data));
    };

    // Отправить данные на верификацию
    const sendVerifyRequest = async (passportData, granted, grantedDate, birthdate, sex, successCallback = () => {}) => {
        setError(false);
        if(passportData.length < 11){
            return alertNotify("Ошибка", "Введите корректные данные паспорта", "warn");
        }
        if(!granted){
            return alertNotify("Ошибка", "Введите кем выдан паспорт", "warn");
        }
        if(grantedDate.length < 11){
            return alertNotify("Ошибка", "Введите дату выдачи паспорта", "warn");
        }
        if(birthdate.length < 11){
            return alertNotify("Ошибка", "Введите данные о дне рождения", "warn");
        }

        const passportDataSplit = passportData.split(" ");

        setIsLoading(true);

        const data = await request(REQUEST_TYPE.USER, "/data", HTTP_METHODS.POST, true, {
            passportSer: passportDataSplit[0],
            passportNum: passportDataSplit[1],
            granted,
            grantedDate: getNormalDate(grantedDate),
            birthdate: getNormalDate(birthdate),
            sex
        });

        setIsLoading(false);

        if(requestDataIsError(data)){
            switch(data.error){
                default:
                    return notifyTemplate(NOTIFY_TYPES.ERROR);
            }
        }

        dispatch(updateUser(data));

        successCallback();
        alertNotify("Успешно", "Данные успешно отправлены на рассмотрение", "success");
    }

    // Создать карту
    const createCard = async (typeId, firstName, secondName, successCallback = () => {}) => {
        setError(false);
        dispatch(setUserIsLoading(true));

        const data = await request(REQUEST_TYPE.USER, "/card", HTTP_METHODS.POST, true, {
            typeId,
            firstName,
            secondName
        });

        dispatch(setUserIsLoading(false));

        if(requestDataIsError(data)){
            switch(data.error){
                default:
                    return notifyTemplate(NOTIFY_TYPES.ERROR);
            }
        }

        dispatch(addCards(data));

        successCallback();
        alertNotify("Успешно", "Карта успешно выпущена", "success");
    }

    // Получить карты пользователя
    const getCards = async (reload = false) => {
        setError(false);
        if(cards.length && !reload){
            return;
        }

        setIsLoading(true);

        const data = await request(REQUEST_TYPE.USER, "/cards", HTTP_METHODS.GET, true);

        setIsLoading(false);

        if(requestDataIsError(data)){
            return setError(true);
        }

        dispatch(initCards(data));
    }

    // Отменить верификацию
    const cancelVerify = async (successCallback = () => {}) => {
        setError(false);
        setIsLoading(true);

        const data = await request(REQUEST_TYPE.USER, "/cancel_data", HTTP_METHODS.POST, true);

        setIsLoading(false);

        if(requestDataIsError(data)){
            switch(data.error){
                default:
                    return notifyTemplate(NOTIFY_TYPES.ERROR);
            }
        }

        dispatch(updateUser(data));

        successCallback();
        alertNotify("Успешно", "Вы отменили отправку верификации", "success");
    }

    // Заблокировать карту
    const blockCard = async (id, successCallback = () => {}) => {
        setError(false);
        setIsLoading(true);

        const data = await request(REQUEST_TYPE.USER, "/card/block", HTTP_METHODS.POST, true, {id});

        setIsLoading(false);

        if(requestDataIsError(data)){
            switch(data.error){
                case REQUEST_STATUSES.YOU_HAVE_MONEY:
                    return alertNotify("Ошибка", "Нельзя заблокировать карту, на которой есть средства", "error");
                default:
                    return notifyTemplate(NOTIFY_TYPES.ERROR);
            }
        }

        dispatch(updateCard({id, data}));

        successCallback();
        alertNotify("Успешно", "Карта заблокирована", "success");
    }

    // Получить список подписок
    const getUserSubscribes = async () => {
        setError(false);
        dispatch(setUserIsLoading(true));

        const data = await request(REQUEST_TYPE.USER, "/subscribes", HTTP_METHODS.GET, true);

        dispatch(setUserIsLoading(false));

        if(requestDataIsError(data)){
            setError(true);
        }
        else{
            dispatch(initSubscribes(data));
        }
    }

    // Подписаться
    const subscribe = async (id) => {
        setError(false);
        setIsLoading(true);

        const data = await request(REQUEST_TYPE.USER, "/subscribe", HTTP_METHODS.POST, true, {id});

        setIsLoading(false);

        if(requestDataIsError(data)){
            switch(data.error){
                case REQUEST_STATUSES.INSUFFICIENT_FUNDS:
                    return alertNotify("Ошибка", "Недостаточно средств", "error");
                default:
                    return notifyTemplate(NOTIFY_TYPES.ERROR);
            }
        }

        dispatch(initSubscribes(data));
    }

    // Отписаться
    const unsubscribe = async (id) => {
        setError(false);
        setIsLoading(true);

        const data = await request(REQUEST_TYPE.USER, "/unsubscribe", HTTP_METHODS.POST, true, {id});

        setIsLoading(false);

        if(requestDataIsError(data)){
            switch(data.error){
                default:
                    return notifyTemplate(NOTIFY_TYPES.ERROR);
            }
        }

        dispatch(initSubscribes(data));
    }

    // Перевыпустить карту
    const recreateCard = async (id, successCallback = () => {}) => {
        setError(false);
        setIsLoading(true);

        const data = await request(REQUEST_TYPE.USER, "/reissue_card", HTTP_METHODS.POST, true, {id});

        setIsLoading(false);

        if(requestDataIsError(data)){
            switch(data.error){
                case REQUEST_STATUSES.CARD_NOT_BLOCKED:
                    return alertNotify("Ошибка", "Карта не заблокирована", "error");
                default:
                    return notifyTemplate(NOTIFY_TYPES.ERROR);
            }
        }

        dispatch(reissueCard({id, data}));

        successCallback();
        alertNotify("Успешно", "Карта перевыпущена", "success");
    }

    // Удалить карту
    const deleteCard = async (id, successCallback = () => {}) => {
        setError(false);
        setIsLoading(true);

        const data = await request(REQUEST_TYPE.USER, "/card", HTTP_METHODS.DELETE, true, {id});

        setIsLoading(false);

        if(requestDataIsError(data)){
            switch(data.error){
                default:
                    return notifyTemplate(NOTIFY_TYPES.ERROR);
            }
        }

        dispatch(removeCard(id));

        successCallback();
        alertNotify("Успешно", "Карта удалена", "success");
    }

    return {
        error,
        isLoading,
        getUserShortInfo,
        getUserFullInfo,
        sendVerifyRequest,
        createCard,
        getCards,
        cancelVerify,
        blockCard,
        getUserSubscribes,
        subscribe,
        unsubscribe,
        recreateCard,
        deleteCard
    }
}

export default useUser;