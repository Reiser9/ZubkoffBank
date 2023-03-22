import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './index.css';

import { REQUEST_TYPE, HTTP_METHODS } from '../../hooks/useRequest';
import { INPUT_MASK_TYPE } from '../../consts/INPUT_MASK_TYPE';

import Input from '../../components/Input';
import Button from '../../components/Button';

import useRequest from '../../hooks/useRequest';
import useNotify from '../../hooks/useNotify';
import {setLogin, setAuthIsLoading} from '../../redux/slices/auth';

const Login = () => {
    const [phoneEnter, setPhoneEnter] = React.useState("");
    const [passwordEnter, setPasswordEnter] = React.useState("");

    const {isLoading, request} = useRequest();
    const {alertNotify} = useNotify();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = async () => {
        if(phoneEnter.length < 17){
            return alertNotify("Ошибка", "Введите корректный номер телефона", "error");
        }

        if(passwordEnter.length < 8){
            return alertNotify("Ошибка", "Пароль не может быть меньше 8 символов", "error");
        }

        dispatch(setAuthIsLoading(true));
        
        const tempPhone = phoneEnter.replace(/[^\d+]/g, '');
        const data = await request(REQUEST_TYPE.AUTH, "/login", HTTP_METHODS.POST, false, {phoneNum: tempPhone, password: passwordEnter});

        dispatch(setAuthIsLoading(false));
        console.log(data);
        if(data.status === 400){
            return alertNotify("Ошибка", "Неверный номер телефона или пароль", "error");
        }

        alertNotify("Успешно", "Вы авторизовались", "success");

        dispatch(setLogin({...data, isAuth: true}));

        const {accessToken, refreshToken, typeToken} = data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("typeToken", typeToken);

        navigate("/");
    }

    return (
        <div className="sign__wrapper">
            <p className="sign__title">
                Вход
            </p>

            <div className="sign__form">
                <Input mask={INPUT_MASK_TYPE.PHONE} placeholder="Номер телефона" value={phoneEnter} setValue={setPhoneEnter} />

                <Input placeholder="Пароль" password value={passwordEnter} setValue={setPasswordEnter} />
            </div>

            <Link to="/recovery" className="sign__link">
                Забыли пароль?
            </Link>

            <Button className="sign__button" onClick={login} disabled={isLoading}>
                Вход
            </Button>
        </div>
    )
}

export default Login;