import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';

import { INPUT_MASK_TYPE } from '../../consts/INPUT_MASK_TYPE';

import useAuth from '../../hooks/useAuth';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useSelector } from 'react-redux';

const Login = () => {
    const [phoneEnter, setPhoneEnter] = React.useState("");
    const [passwordEnter, setPasswordEnter] = React.useState("");

    const {authIsLoading} = useSelector(state => state.auth);
    const {login} = useAuth();

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

            <Button className="sign__button" onClick={() => login(phoneEnter, passwordEnter)} disabled={authIsLoading}>
                Вход
            </Button>
        </div>
    )
}

export default Login;