import React from 'react';

import './index.css';

import { LoginIcon, RegisterIcon } from '../../components/Icons';
import Login from './Login';
import Register from './Register';
import NoAuthWrapper from '../../components/Wrappers/NoAuthWrapper';

const Sign = () => {
    const [isLogin, setIsLogin] = React.useState(true);

    React.useEffect(() => {
        document.title = `${process.env.REACT_APP_BANK_NAME} Bank - ${isLogin ? "Вход" : "Регистрация"}`;
        window.scrollTo(0, 0);
    }, [isLogin]);

    return (
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
                        ? <div className="sign__info">
                            <LoginIcon className="login__icon" />

                            <p className="sign__info--title">
                                Авторизуйтесь на нашем сайте чтобы:
                            </p>

                            <div className="sign__info--points">
                                <p className="sign__info--point">
                                    Производить оплату счетов
                                </p>

                                <p className="sign__info--point">
                                    Настроить аккаунт под себя
                                </p>

                                <p className="sign__info--point">
                                    Поболтать с технической поддержкой
                                </p>
                            </div>
                        </div>
                        : <div className="sign__info">
                            <RegisterIcon className="register__icon" />

                            <p className="sign__info--title">
                                Зачем регистрироваться на {process.env.REACT_APP_BANK_NAME}?
                            </p>

                            <div className="sign__info--points">
                                <p className="sign__info--point">
                                    Система быстрых платежей
                                </p>

                                <p className="sign__info--point">
                                    Выгодные условия по картам
                                </p>

                                <p className="sign__info--point">
                                    Оперативная техническая поддержка 24/7
                                </p>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </NoAuthWrapper>
    )
}

export default Sign;