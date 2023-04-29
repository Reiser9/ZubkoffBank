import { useDispatch } from 'react-redux';

import useRequest from './useRequest';
import { REQUEST_TYPE, HTTP_METHODS } from '../consts/HTTP';
import { REQUEST_STATUSES } from '../consts/REQUEST_STATUSES';
import { setAuthIsLoading, setLogin, setIsAuth, setDataAuth } from '../redux/slices/auth';
import { setAppIsLoading, setDataApp } from '../redux/slices/app';
import { setDataAdmin } from '../redux/slices/admin';
import { setDataUser } from '../redux/slices/user';
import { setIsServerAvailable } from '../redux/slices/server';
import useNotify, {NOTIFY_TYPES} from './useNotify';
import useUser from './useUser';
import {unmaskPhone} from '../utils/maskPhone';

const useAuth = () => {
    const dispatch = useDispatch();
    const {request, getHealthServer} = useRequest();
    const {alertNotify, notifyTemplate} = useNotify();
    const {getUserShortInfo} = useUser();

    // Очищение данных локально
    const clearData = () => {
        // Удаление всех токенов
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("typeToken");

        dispatch(setDataUser()); //Очищение данных о пользователе
        dispatch(setDataAdmin()); //Очистить админские данные
        dispatch(setDataAuth()); //Очистить токены авторизации
        dispatch(setDataApp()); //Очистить данные приложения (флаг блокировки и загрузка приложения)
        // Добавлять очищение данных по мере создания
        dispatch(setAuthIsLoading(false)); //Загрузка авторизации
        dispatch(setIsAuth(false)); //Флаг авторизации пользователя
    }

    // Выход
    const logout = () => {
        clearData();
        alertNotify("Успешно", "Вы вышли из аккаунта", "success");
    }

    // Перезагрузить, вдруг сервер заработал
    const reload = async () => {
        dispatch(setAppIsLoading(true));
        dispatch(setIsServerAvailable(true));

        const data = await getHealthServer();

        if(data !== REQUEST_STATUSES.SITE_NOT_AVAILABLE){
            checkAuth();
        }

        dispatch(setAppIsLoading(false));
    }

    // Проверка авторизации
    const checkAuth = async () => {
        dispatch(setAppIsLoading(true));
        dispatch(setAuthIsLoading(true));

        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const typeToken = localStorage.getItem("typeToken");

        if(!accessToken || !refreshToken || !typeToken){
            return clearData();
        }

        const data = await getUserShortInfo();

        if(data.error === REQUEST_STATUSES.YOU_ARE_BLOCKED){
            dispatch(setAuthIsLoading(false));
            dispatch(setAppIsLoading(false));
            return;
        }

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL || data.status === 403){
            const newTokens = await request(REQUEST_TYPE.AUTH, "/refresh", HTTP_METHODS.POST, false, {refreshToken});
            
            if(newTokens.status === REQUEST_STATUSES.NOT_SUCCESSFUL){
                return clearData();
            }

            localStorage.setItem("accessToken", newTokens.accessToken);
            localStorage.setItem("refreshToken", newTokens.refreshToken);
            localStorage.setItem("typeToken", newTokens.typeToken);

            return checkAuth();
        }
        
        dispatch(setLogin({accessToken, refreshToken, typeToken, isAuth: true}));

        dispatch(setAuthIsLoading(false));
        dispatch(setAppIsLoading(false));
    }

    // Вход
    const login = async (phone, password, withoutNotify = false, successCallback = () => {}) => {
        if(phone.length < 17){
            return notifyTemplate(NOTIFY_TYPES.PHONE);
        }

        if(password.length < 8){
            return alertNotify("Предупреждение", "Пароль не может быть меньше 8 символов", "warn");
        }

        dispatch(setAuthIsLoading(true));
        
        const data = await request(REQUEST_TYPE.AUTH, "/login", HTTP_METHODS.POST, false, {phoneNum: unmaskPhone(phone), password});
        
        dispatch(setAuthIsLoading(false));

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL || data.status === 500){
            return alertNotify("Ошибка", "Неверный номер телефона или пароль", "error");
        }

        dispatch(setLogin({...data, isAuth: true}));

        const {accessToken, refreshToken, typeToken} = data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("typeToken", typeToken);

        dispatch(setAppIsLoading(true));

        await getUserShortInfo();

        successCallback();

        if(!withoutNotify){
            alertNotify("Успешно", "Вы авторизовались", "success");
        }

        dispatch(setAppIsLoading(false));
    }

    // Отправить код при регистрации
    const sendCodeRegister = async (phone, successCallback = () => {}) => {
        dispatch(setAuthIsLoading(true));

        const data = await request(REQUEST_TYPE.AUTH, "/send_code_register", HTTP_METHODS.POST, false, {phoneNum: unmaskPhone(phone)});

        dispatch(setAuthIsLoading(false));

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL || data.status === 500){
            switch(data.error){
                case REQUEST_STATUSES.ALREADY_REGISTERED:
                    return alertNotify("Ошибка", "Пользователь в такими данными уже зарегистрирован", "warn");
                default:
                    return alertNotify("Ошибка", "Вы не отправили боту номер телефона", "warn");
            }
        }

        successCallback();
        alertNotify("Успешно", "Код отправлен", "success");
    }
    
    // Регистрация
    const register = async (phone, password, fullName, code, successCallback = () => {}) => {
        if(code.length !== 6){
            return notifyTemplate(NOTIFY_TYPES.CODE);
        }

        dispatch(setAuthIsLoading(true));

        const data = await request(REQUEST_TYPE.AUTH, "/register", HTTP_METHODS.POST, false, {phoneNum: unmaskPhone(phone), fullName, password, code});

        dispatch(setAuthIsLoading(false));

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL || data.status === 500){
            switch(data.error){
                case REQUEST_STATUSES.ALREADY_REGISTERED:
                    return alertNotify("Ошибка", "Пользователь в такими данными уже зарегистрирован", "warn");
                default:
                    return notifyTemplate(NOTIFY_TYPES.INVALID_CODE);
            }
        }

        await login(phone, password, true);

        successCallback();
        alertNotify("Успешно", "Вы зарегистрировались", "success");
    }

    // Смена пароля
    const changePassword = async (password, newPassword, successCallback = () => {}) => {
        dispatch(setAuthIsLoading(true));

        const data = await request(REQUEST_TYPE.USER, "/change_pass", HTTP_METHODS.POST, true, {password, newPassword});

        dispatch(setAuthIsLoading(false));

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL || data.status === 500){
            switch (data.error) {
                case "Password is too short/long":
                    return alertNotify("Ошибка", "Новый пароль меньше 8 или больше 35 символов", "warn");
                default:
                    return alertNotify("Ошибка", "Старый пароль введен неверно", "warn");
            }
        }

        successCallback();
        alertNotify("Успешно", "Пароль изменен", "success");
    }

    // Удаление аккаунт
    const deleteAccount = async (password, successCallback = () => {}) => {
        if(!password){
            return alertNotify("Ошибка", "Введите пароль", "warn");
        }

        dispatch(setAuthIsLoading(true));

        const data = await request(REQUEST_TYPE.USER, "/", HTTP_METHODS.DELETE, true, {password});

        dispatch(setAuthIsLoading(false));

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL || data.status === 500){
            switch(data.error){
                default:
                    return alertNotify("Ошибка", "Неверный пароль", "error");
            }
        }

        successCallback();
        clearData();
        alertNotify("Успешно", "Аккаунт удален", "success");
    }

    // Выслать код для восстановления пароля
    const sendCodeRecovery = async (phoneNum, successCallback = () => {}) => {
        if(phoneNum.length < 17){
            return notifyTemplate(NOTIFY_TYPES.PHONE);
        }

        dispatch(setAuthIsLoading(true));

        const data = await request(REQUEST_TYPE.AUTH, "/send_code_recovery", HTTP_METHODS.POST, false, {phoneNum: unmaskPhone(phoneNum)});

        dispatch(setAuthIsLoading(false));

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL || data.status === 500){
            switch(data.error){
                case REQUEST_STATUSES.PHONE_NOT_FOUND:
                    return alertNotify("Ошибка", "Пользователь с таким номером телефона не найден", "error");
                default:
                    return notifyTemplate(NOTIFY_TYPES.ERROR);
            }
        }

        successCallback();
        alertNotify("Успешно", "Код отправлен", "success");
    }

    const checkCodeRecovery = async (phoneNum, code, successCallback = () => {}) => {
        if(phoneNum.length < 17){
            return notifyTemplate(NOTIFY_TYPES.PHONE);
        }

        if(code.length !== 6){
            return notifyTemplate(NOTIFY_TYPES.PHONE);
        }

        dispatch(setAuthIsLoading(true));

        const data = await request(REQUEST_TYPE.AUTH, "/check_recovery_code", HTTP_METHODS.POST, false, {phoneNum: unmaskPhone(phoneNum), code});

        dispatch(setAuthIsLoading(false));

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL || data.status === 500){
            switch(data.error){
                case REQUEST_STATUSES.INVALID_CODE:
                    return notifyTemplate(NOTIFY_TYPES.CODE);
                default:
                    return notifyTemplate(NOTIFY_TYPES.ERROR);
            }
        }

        successCallback();
    }

    // Восстановление пароля (изменить пароль)
    const recoveryPassword = async (phoneNum, password, code, successCallback = () => {}) => {
        if(phoneNum.length < 17){
            return notifyTemplate(NOTIFY_TYPES.PHONE);
        }

        if(password.length < 8){
            return notifyTemplate(NOTIFY_TYPES.PASSWORD_SHORT);
        }

        if(password.length > 35){
            return notifyTemplate(NOTIFY_TYPES.PASSWORD_LONG);
        }

        if(code.length !== 6){
            return notifyTemplate(NOTIFY_TYPES.CODE);
        }

        dispatch(setAuthIsLoading(true));

        const data = await request(REQUEST_TYPE.AUTH, "/recovery_password", HTTP_METHODS.POST, false, {phoneNum: unmaskPhone(phoneNum), password, code});

        dispatch(setAuthIsLoading(false));

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL || data.status === 500){
            switch(data.error){
                case REQUEST_STATUSES.INVALID_CODE:
                    return notifyTemplate(NOTIFY_TYPES.INVALID_CODE);
                default:
                    return notifyTemplate(NOTIFY_TYPES.ERROR);
            }
        }

        successCallback();
        alertNotify("Успешно", "Пароль изменен", "success");
    }

    return {
        checkAuth,
        login,
        logout,
        sendCodeRegister,
        register,
        changePassword,
        reload,
        deleteAccount,
        sendCodeRecovery,
        checkCodeRecovery,
        recoveryPassword
    }
}

export default useAuth;