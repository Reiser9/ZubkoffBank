import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useRequest, { REQUEST_TYPE, HTTP_METHODS } from './useRequest';

import { setAuthIsLoading, setLogin } from '../redux/slices/auth';
import { setUser } from '../redux/slices/user';
import useNotify from './useNotify';

import {unmaskPhone} from '../utils/maskPhone';

const useAuth = () => {
    const dispatch = useDispatch();
    const {request} = useRequest();
    const {alertNotify} = useNotify();
    const navigate = useNavigate();

    const clearData = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("typeToken");

        dispatch(setUser({}));
        dispatch(setAuthIsLoading(false));
    }

    const getUserInfo = async () => {
        const data = await request(REQUEST_TYPE.USER, "/full_info", HTTP_METHODS.GET, true);

        dispatch(setUser(data));

        return data;
    }

    const checkAuth = async () => {
        dispatch(setAuthIsLoading(true));

        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const typeToken = localStorage.getItem("typeToken");

        if(!accessToken || !refreshToken || !typeToken){
            return clearData();
        }

        const data = await getUserInfo();

        if(!data){
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
    }

    // ЗАПРАШИВАТЬ SHORT INFO
    const login = async (phone, password, withoutNotify = false) => {
        if(phone.length < 17){
            return alertNotify("Ошибка", "Введите корректный номер телефона", "error");
        }

        if(password.length < 8){
            return alertNotify("Ошибка", "Пароль не может быть меньше 8 символов", "error");
        }

        dispatch(setAuthIsLoading(true));
        
        const data = await request(REQUEST_TYPE.AUTH, "/login", HTTP_METHODS.POST, false, {phoneNum: unmaskPhone(phone), password});

        dispatch(setAuthIsLoading(false));
        
        if(!data){ //Проверять другое, обобщить ошибку сервера
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

        await getUserInfo();

        navigate("/");
    }

    const sendCodeRegister = async (phone) => {
        const data = await request(REQUEST_TYPE.AUTH, "/send_code_register", HTTP_METHODS.POST, false, {phoneNum: unmaskPhone(phone)});

        if(!data){
            return alertNotify("Ошибка", "Вы не отправили боту номер телефона", "warn");
        }

        alertNotify("Успешно", "Код отправлен", "success");
    }
    
    const register = async (phone, password, fullName, code) => {
        if(code.length < 6){
            return alertNotify("Ошибка", "Код не может быть меньше 6 символов", "warn");
        }

        const data = await request(REQUEST_TYPE.AUTH, "/register", HTTP_METHODS.POST, false, {phoneNum: unmaskPhone(phone), fullName, password, code});

        if(!data){
            return alertNotify("Ошибка", "Неверный или недействительный код", "warn");
        }

        await login(phone, password, true);

        alertNotify("Успешно", "Вы зарегистрировались", "success");
    }

    return {checkAuth, login, sendCodeRegister, register}
}

export default useAuth;