import React from 'react';
import { useSelector } from 'react-redux';

import './index.css';

import { Save } from '../../components/Icons';
import { INPUT_MASK_TYPE } from '../../consts/INPUT_MASK_TYPE';

import useNotify from '../../hooks/useNotify';
import useAuth from '../../hooks/useAuth';

import Button from '../../components/Button';
import Input from '../../components/Input';

const Register = () => {
    const [stage, setStage] = React.useState(1);
    const [seconds, setSeconds] = React.useState(10);
    const [isCodeAgain, setIsCodeAgain] = React.useState(true);

    const [phoneRegister, setPhoneRegister] = React.useState("");
    const [nameRegister, setNameRegister] = React.useState("");
    const [passwordRegister, setPasswordRegister] = React.useState("");
    const [passwordAgainRegister, setPasswordAgainRegister] = React.useState("");
    
    const [registerCode, setRegisterCode] = React.useState("");

    const [agree, setAgree] = React.useState(false);

    const {alertNotify} = useNotify();
    const {authIsLoading} = useSelector(state => state.auth);
    const {sendCodeRegister, register} = useAuth();

    const goToSmsCode = () => {
        const fioValid = nameRegister.trim().split(" ").length;

        if(phoneRegister.length < 17){
            return alertNotify("Предупреждение", "Введите корректный номер телефона", "warn");
        }
        if(!nameRegister || fioValid !== 3){
            return alertNotify("Предупреждение", "Введите корретные данные ФИО", "warn");
        }
        if(passwordRegister.length < 8){
            return alertNotify("Предупреждение", "Пароль не может быть меньше 8 символов", "warn");
        }
        if(passwordRegister !== passwordAgainRegister){
            return alertNotify("Предупреждение", "Пароли не совпадают", "warn");
        }

        setStage(2);
    }

    React.useEffect(() => {
        let codeInterval;

        if(!isCodeAgain){
            codeInterval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 1000);
        }

        if(seconds <= 0){
            setIsCodeAgain(true);
            clearInterval(codeInterval);
        }

        return () => clearInterval(codeInterval);
    }, [isCodeAgain, seconds]);

    const sendSmsCode = async () => {
        sendCodeRegister(phoneRegister, () => {
            setIsCodeAgain(false);
            setSeconds(60);
            setStage(3);
        });
    }

    const registerHandler = () => {
        register(phoneRegister, passwordRegister, nameRegister, registerCode);
    }

    return (
        <div className="sign__wrapper">
            <p className="sign__title">
                Регистрация
            </p>

            {stage === 1 && <>
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
                    {agree ? <Button className="register__button" onClick={goToSmsCode}>
                        Регистрация
                    </Button> : <Button className="register__button" disabled>
                        Регистрация
                    </Button>}

                    <div className="sign__save">
                        <Save className="sign__save--icon" />

                        <p className="sign__save--text">
                            Ваши данные надежно защищены
                        </p>
                    </div>
                </div>
            </>}
            
            {stage >= 2 && <>
                <div className="sign__subtitle">
                    Для завершения регистрации подтвердите ваш номер телефона через телеграм <a href={process.env.REACT_APP_BOT_URL} className="sign__link" target="_blanc">бота</a>
                </div>

                <div className="sign__warning sign__warning_1">
                    Обязательно напишите боту /start перед отправкой кода
                </div>

                {stage >= 3 && <div className="sign__form sign__form_telegram">
                    <Input mask={INPUT_MASK_TYPE.CONFIRM_CODE} placeholder="Код подтверждения" value={registerCode} setValue={setRegisterCode} />
                </div>}

                {isCodeAgain && <div className={`sign__link sign__send${authIsLoading ? " disabled" : ""}`} onClick={sendSmsCode}>Выслать код</div>}

                {stage >= 3 && <>
                    {!isCodeAgain && <div className="sign__again">
                        Выслать код повторно через <span className="sign__blue">{seconds} сек.</span>
                    </div>}

                    <div className="sign__button--inner">
                        <Button className="register__button" onClick={registerHandler} disabled={authIsLoading}>
                            Регистрация
                        </Button>
                    </div>
                </>}
            </>}
        </div>
    )
}

export default Register;