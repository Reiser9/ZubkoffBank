import React from 'react';

import './index.css';

import Login from './Login';
import Register from './Register';
import NoAuthWrapper from '../../components/Wrappers/NoAuthWrapper';
import TitleWrapper from '../../components/Wrappers/TitleWrapper';
import SignImgBlock from '../../components/SignImgBlock';

const Sign = () => {
    const [isLogin, setIsLogin] = React.useState(true);

    return (
        <TitleWrapper pageTitle={isLogin ? "Вход" : "Регистрация"}>
            <NoAuthWrapper>
                <div className="sign">
                    <div className="container sign__container">
                        <div className="sign__inner">
                            <div className="sign__content">
                                <div className="sign__tabs">
                                    <div className={`sign__tab${isLogin ? " active" : ""}`} onClick={() => setIsLogin(true)}>
                                        Вход
                                    </div>

                                    <div className={`sign__tab${!isLogin ? " active" : ""}`} onClick={() => setIsLogin(false)}>
                                        Регистрация
                                    </div>
                                </div>

                                {isLogin ? <Login /> : <Register />}
                            </div>

                            {isLogin
                            ? <SignImgBlock title="Авторизуйтесь на нашем сайте чтобы:" img="login" points={[
                                {text: "Производить оплату счетов"},
                                {text: "Настроить аккаунт под себя"},
                                {text: "Поболтать с технической поддержкой"}
                            ]} />
                            : <SignImgBlock title={`Зачем регистрироваться на ${process.env.REACT_APP_BANK_NAME}?`} img="register" points={[
                                {text: "Система быстрых платежей"},
                                {text: "Выгодные условия по картам"},
                                {text: "Оперативная техническая поддержка 24/7"}
                            ]} />}
                        </div>
                    </div>
                </div>
            </NoAuthWrapper>
        </TitleWrapper>
    )
}

export default Sign;