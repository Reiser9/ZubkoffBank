import React from 'react';
import {Link} from 'react-router-dom';

import './index.css';

import {LoginIcon, RegisterIcon, Save} from '../../components/Icons';
import Button from '../../components/Button';
import Input from '../../components/Input';

const Sign = () => {
    const [phoneEnter, setPhoneEnter] = React.useState("");
    const [passwordEnter, setPasswordEnter] = React.useState("");

    const [phoneRegister, setPhoneRegister] = React.useState("");
    const [nameRegister, setNameRegister] = React.useState("");
    const [passwordRegister, setPasswordRegister] = React.useState("");
    const [passwordAgainRegister, setPasswordAgainRegister] = React.useState("");

    const [isLogin, setIsLogin] = React.useState(true);
    const [agree, setAgree] = React.useState(false);

    React.useEffect(() => {
        document.title = `Zubkoff Bank - ${isLogin ? "Вход" : "Регистрация"}`
    }, [isLogin]);

    return(
        <div className="sign">
            <div className="container">
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

                        {isLogin
                        ? <div className="sign__wrapper">
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

                            <Button className="sign__button">
                                Вход
                            </Button>
                        </div>
                        : <div className="sign__wrapper">
                            <p className="sign__title">
                                Регистрация
                            </p>

                            <div className="sign__subtitle">
                                Станьте клиентом банка #1
                            </div>

                            <div className="sign__form">
                                <Input placeholder="Номер телефона" value={phoneRegister} setValue={setPhoneRegister} />

                                <Input placeholder="ФИО" value={nameRegister} setValue={setNameRegister} />

                                <Input placeholder="Пароль" password value={passwordRegister} setValue={setPasswordRegister} />

                                <Input placeholder="Повторите пароль" password value={passwordAgainRegister} setValue={setPasswordAgainRegister} />
                            </div>

                            <div className="sign__agree">
                                <input type="checkbox" className="checkbox" id="registerAgree" checked={agree} onChange={() => setAgree(prev => !prev)} />

                                <label htmlFor="registerAgree" className="sign__agree--label">
                                    Я даю свое согласие на обработку <span className="sign__agree--link">своих персональных данных</span>, соглашаюсь с <span className="sign__agree--link">Публичной офертой</span> и <span className="sign__agree--link">Соглашением о рекуррентных списаниях</span>, а также ознакомлен(а) со всеми документами, размещенными на Сервисе и <span className="sign__agree--link">тарифами</span> проекта. <span className="sign__agree--link">Политика конфиденциальности</span>
                                </label>
                            </div>

                            <div className="sign__button--inner">
                                <Button className="register__button" disabled={!agree}>
                                    Регистрация
                                </Button>

                                <div className="sign__save">
                                    <Save className="sign__save--icon" />

                                    <p className="sign__save--text">
                                        Ваши данные надежно защищены
                                    </p>
                                </div>
                            </div>
                        </div>}
                    </div>

                    {isLogin ? <div className="sign__info">
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
    )
}

export default Sign;