import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';

import { REQUEST_TYPE, HTTP_METHODS } from '../../hooks/useRequest';
import { INPUT_MASK_TYPE } from '../../consts/INPUT_MASK_TYPE';

import Input from '../../components/Input';
import Button from '../../components/Button';

import useRequest from '../../hooks/useRequest';
import useNotify from '../../hooks/useNotify';

const Login = () => {
    const [phoneEnter, setPhoneEnter] = React.useState("");
    const [passwordEnter, setPasswordEnter] = React.useState("");

    const {isLoading, error, request} = useRequest();
    const {alertNotify} = useNotify();

    const login = async () => {
        const data = await request(REQUEST_TYPE.AUTH, "/login", HTTP_METHODS.POST, false, {phoneNum: phoneEnter, password: passwordEnter});

        // if(error){
        //     alertNotify("Ошибка", "Не удалось авторизоваться", "error");
        // }

        console.log(data);
    }

    return (
        <div className="sign__wrapper">
            <p className="sign__title">
                Вход
            </p>

            <div className="sign__form">
                <Input placeholder="Номер телефона" value={phoneEnter} setValue={setPhoneEnter} />

                <Input placeholder="Пароль" password value={passwordEnter} setValue={setPasswordEnter} />
            </div>

            <Link to="/recovery" className="sign__link">
                Забыли пароль?
            </Link>

            <Button className="sign__button" onClick={login}>
                Вход
            </Button>
        </div>
    )
}

export default Login;