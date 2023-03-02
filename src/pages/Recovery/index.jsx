import React from 'react';
import { Link } from 'react-router-dom';

import '../Sign/index.css';

import { LoginIcon, RegisterIcon, Save, RecoveryIcon } from '../../components/Icons';
import Button from '../../components/Button';
import Input from '../../components/Input';

const Recovery = () => {
    const [phoneEnter, setPhoneEnter] = React.useState("");
    const [passwordEnter, setPasswordEnter] = React.useState("");

    React.useEffect(() => {
        document.title = `${process.env.REACT_APP_BANK_NAME} Bank - Забыли пароль`;
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="sign">
            <div className="container">
                <div className="sign__inner">
                    <div className="sign__content">
                        <div className="sign__wrapper">
                            <p className="sign__title recovery__title">
                                Восстановление пароля
                            </p>

                            <div className="sign__subtitle">
                                На номер телефона +79123456789 было отправлено СМС с кодом подтверждения
                            </div>

                            <div className="sign__form">
                                <Input placeholder="Введите номер телефона" value={phoneEnter} setValue={setPhoneEnter} />
                            </div>

                            <p className="recovery__text">
                                Не пришлом СМС?<span>Отправить код повторно</span>
                            </p>

                            <Button className="sign__btn">
                                Отправить
                            </Button>
                        </div>
                    </div>

                    <div className="sign__info">
                        <RecoveryIcon className="login__icon" />

                        <p className="sign__info--title">
                            Восстановление пароля на Zubkoff
                        </p>

                        <div className="sign__info--points">
                            <p className="sign__info--point">
                                Введите номер телефона, указанный при регистрайии
                            </p>

                            <p className="sign__info--point">
                                После этого мы отправим код подтверждения
                            </p>

                            <p className="sign__info--point">
                                После успешного ввода кода подтверждения  у Вас будет возможность придумать новый пароль
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Recovery;