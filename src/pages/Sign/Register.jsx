import React from 'react';

import './index.css';

import { Save } from '../../components/Icons';
import { INPUT_MASK_TYPE } from '../../consts/INPUT_MASK_TYPE';

import Button from '../../components/Button';
import Input from '../../components/Input';

const Register = () => {
    const [phoneRegister, setPhoneRegister] = React.useState("");
    const [nameRegister, setNameRegister] = React.useState("");
    const [passwordRegister, setPasswordRegister] = React.useState("");
    const [passwordAgainRegister, setPasswordAgainRegister] = React.useState("");
    
    const [registerCode, setRegisterCode] = React.useState("");

    const [agree, setAgree] = React.useState(false);

    return (
        <div className="sign__wrapper">
            <p className="sign__title">
                Регистрация
            </p>

            {/* первое состояние */}
            <div className="sign__subtitle">
                Станьте клиентом банка #1
            </div>

            <div className="sign__form">
                <Input mask={INPUT_MASK_TYPE.PHONE} placeholder="Номер телефона" value={phoneRegister} setValue={setPhoneRegister} />

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
            
            {/* все состояния */}
            {/* <div className="sign__subtitle">
                Для завершения регистрации подтвердите ваш номер телефона через телеграм бота <a href="#" className="sign__link">@zubkoffbot</a>
            </div>

            <div className="sign__warning sign__warning_1">
                Обязательно напишите боту /start перед отправкой кода
            </div>

            <div className="sign__form sign__form_telegram">
                <Input placeholder="Код подтверждения" value={registerCode} setValue={setRegisterCode} />
            </div>

            <div className="sign__warning sign__warning_2">
                Бот не пишет первым, пожалуйста, напишите ему, он очень ждет(
            </div>

            <div className="sign__link sign__send">Выслать код</div>

            <div className="sign__again">
                Выслать код повторно через <span className="sign__blue">50 сек.</span>
            </div>

            <div className="sign__button--inner">
                <Button className="register__button" disabled={!agree}>
                    Регистрация
                </Button>
            </div> */}
        </div>
    )
}

export default Register;