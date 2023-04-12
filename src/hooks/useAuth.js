import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useRequest, { REQUEST_TYPE, HTTP_METHODS } from './useRequest';

import { REQUEST_STATUSES } from '../consts/REQUEST_STATUSES';
import { setAuthIsLoading, setLogin, setIsAuth } from '../redux/slices/auth';
import { setAppIsLoading } from '../redux/slices/app';
import { initUser } from '../redux/slices/user';
import { setIsServerAvailable } from '../redux/slices/server';
import useNotify from './useNotify';
import useUser from './useUser';

import {unmaskPhone} from '../utils/maskPhone';

const useAuth = () => {
    const dispatch = useDispatch();
    const {request, getHealthServer} = useRequest();
    const {alertNotify} = useNotify();
    const {getUserShortInfo} = useUser();
    const navigate = useNavigate();

    // Очищение данных локально
    const clearData = () => {
        // Удаление всех токенов
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("typeToken");

        dispatch(initUser({})); //Очищение данных о пользователе
        dispatch(setAuthIsLoading(false)); //Загрузка авторизации
        dispatch(setIsAuth(false)); //Флаг авторизации пользователя
        dispatch(setAppIsLoading(false)); //Загрузка приложения
    }

    // Выход
    const logout = () => {
        clearData();
        navigate("/");
        return alertNotify("Успешно", "Вы вышли из аккаунта", "success");
    }

    // Перезагрузить, вдруг сервер заработал
    const reload = async () => {
        dispatch(setAppIsLoading(true));
        dispatch(setIsServerAvailable(true));

        const data = await getHealthServer();

        if(!data){
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

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL){
            const newTokens = await request(REQUEST_TYPE.AUTH, "/refresh", HTTP_METHODS.POST, false, {refreshToken});
            
            if(!newTokens){
                return clearData();
            }

            localStorage.setItem("accessToken", newTokens.accessToken);
            localStorage.setItem("refreshToken", newTokens.refreshToken);
            localStorage.setItem("typeToken", newTokens.typeToken);

            checkAuth();
        }
        
        dispatch(setLogin({accessToken, refreshToken, typeToken, isAuth: true}));

        dispatch(setAuthIsLoading(false));
        dispatch(setAppIsLoading(false));
    }

    // Вход
    const login = async (phone, password, withoutNotify = false) => {
        if(phone.length < 17){
            return alertNotify("Предупреждение", "Введите корректный номер телефона", "warn");
        }

        if(password.length < 8){
            return alertNotify("Предупреждение", "Пароль не может быть меньше 8 символов", "warn");
        }

        dispatch(setAuthIsLoading(true));
        
        const data = await request(REQUEST_TYPE.AUTH, "/login", HTTP_METHODS.POST, false, {phoneNum: unmaskPhone(phone), password});

        dispatch(setAuthIsLoading(false));
        
        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL){
            return alertNotify("Ошибка", "Неверный номер телефона или пароль", "error");
        }

        if(!withoutNotify){
            alertNotify("Успешно", "Вы авторизовались", "success");
        }

        dispatch(setLogin({...data, isAuth: true}));

        const {accessToken, refreshToken, typeToken} = data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("typeToken", typeToken);

        await getUserShortInfo();

        navigate("/");
    }

    // Отправить код при регистрации
    const sendCodeRegister = async (phone) => {
        dispatch(setAuthIsLoading(true));

        const data = await request(REQUEST_TYPE.AUTH, "/send_code_register", HTTP_METHODS.POST, false, {phoneNum: unmaskPhone(phone)});

        dispatch(setAuthIsLoading(false));

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL){
            alertNotify("Ошибка", "Вы не отправили боту номер телефона", "warn");
            return data.status;
        }

        alertNotify("Успешно", "Код отправлен", "success");
    }
    
    // Регистрация
    const register = async (phone, password, fullName, code) => {
        if(code.length < 6){
            return alertNotify("Ошибка", "Код не может быть меньше 6 символов", "warn");
        }

        dispatch(setAuthIsLoading(true));

        const data = await request(REQUEST_TYPE.AUTH, "/register", HTTP_METHODS.POST, false, {phoneNum: unmaskPhone(phone), fullName, password, code});

        dispatch(setAuthIsLoading(false));

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL){
            return alertNotify("Ошибка", "Неверный или недействительный код", "warn");
        }

        await login(phone, password, true);

        alertNotify("Успешно", "Вы зарегистрировались", "success");
    }

    // Смена пароля
    const changePassword = async (password, newPassword) => {
        dispatch(setAuthIsLoading(true));

        const data = await request(REQUEST_TYPE.USER, "/change_pass", HTTP_METHODS.POST, true, {password, newPassword});

        dispatch(setAuthIsLoading(false));

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL){
            return alertNotify("Ошибка", "Старый пароль введен неверно", "warn");
        }

        alertNotify("Успешно", "Пароль изменен", "success");
    }

    return {checkAuth, login, logout, sendCodeRegister, register, changePassword, reload}
}

export default useAuth;