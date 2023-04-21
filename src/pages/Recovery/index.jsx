import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import '../Sign/index.css';
import './index.css';

import useAuth from '../../hooks/useAuth';
import useNotify, { NOTIFY_TYPES } from '../../hooks/useNotify';
import {INPUT_MASK_TYPE} from '../../consts/INPUT_MASK_TYPE';

import Button from '../../components/Button';
import Input from '../../components/Input';
import NoAuthWrapper from '../../components/Wrappers/NoAuthWrapper';
import TitleWrapper from '../../components/Wrappers/TitleWrapper';
import SignImgBlock from '../../components/SignImgBlock';

const Recovery = () => {
    const [step, setStep] = React.useState(1);

    const [phone, setPhone] = React.useState("");
    const [code, setCode] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordAgain, setPasswordAgain] = React.useState("");

    const {recoveryPassword, sendCodeRecovery} = useAuth();
    const {authIsLoading} = useSelector(state => state.auth);
    const {notifyTemplate} = useNotify();

    const prevStep = () => {
        setStep(step => step - 1);
    }

    const sendCodeRecoveryHandler = () => {
        sendCodeRecovery(phone, () => setStep(2));
    }

    const confirmRecoveryCode = () => {
        if(code.length !== 6){
            return notifyTemplate(NOTIFY_TYPES.CODE);
        }

        setStep(3);
    }

    const recoveryPasswordHandler = () => {
        if(password !== passwordAgain){
            return notifyTemplate(NOTIFY_TYPES.CONFIRM_PASSWORD);
        }

        recoveryPassword(phone, code, password);
    }

    return (
        <TitleWrapper pageTitle="Забыли пароль">
            <NoAuthWrapper>
                <div className="sign">
                    <div className="container">
                        <div className="sign__inner">
                            <div className="sign__content">
                                <div className="sign__wrapper">
                                    <div className="sign__steps">
                                        <div className="sign__step active">1</div>
                                        <div className={`sign__step${step > 1 ? " active" : ""}`}>2</div>
                                        <div className={`sign__step${step > 2 ? " active" : ""}`}>3</div>
                                    </div>

                                    <p className="sign__title">
                                        Восстановление пароля
                                    </p>

                                    {step === 1 && <div className="sign__step-inner">
                                        <div className="sign__form">
                                            <Input mask={INPUT_MASK_TYPE.PHONE} placeholder="Введите номер телефона" value={phone} setValue={setPhone} />
                                        </div>

                                        <Link to="/sign" className="sign__link">Вспомнили пароль?</Link>

                                        <div className="recovery__btns">
                                            <Button className="sign__btn recovery__btn" onClick={sendCodeRecoveryHandler} disabled={authIsLoading}>
                                                Отправить
                                            </Button>
                                        </div>
                                    </div>}

                                    {step === 2 && <div className="sign__step-inner">
                                        <div className="sign__subtitle">
                                            На номер телефона {phone} было отправлено СМС с кодом подтверждения
                                        </div>
                                        
                                        <div className="sign__form">
                                            <Input mask={INPUT_MASK_TYPE.CONFIRM_CODE} placeholder="Введите полученный код" value={code} setValue={setCode} />
                                        </div>

                                        <div className="recovery__btns">
                                            <Button className="sign__btn recovery__btn" onClick={confirmRecoveryCode}>
                                                Отправить
                                            </Button>

                                            <div className="recovery__back" onClick={prevStep}>Назад</div>
                                        </div>
                                    </div>}

                                    {step === 3 && <div className="sign__step-inner">
                                        <div className="sign__form">
                                            <Input placeholder="Придумайте новый пароль" value={password} setValue={setPassword} password/>
                                            <Input placeholder="Подтвердите пароль" value={passwordAgain} setValue={setPasswordAgain} password/>
                                        </div>

                                        <div className="recovery__btns">
                                            <Button className="sign__btn recovery__btn" onClick={recoveryPasswordHandler}>
                                                Сменить пароль
                                            </Button>

                                            <div className="recovery__back" onClick={prevStep}>Назад</div>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                            
                            <SignImgBlock title={`Восстановление пароля на ${process.env.REACT_APP_BANK_NAME}`} img="recovery" points={[
                                {text: "Введите номер телефона, указанный при регистрайии"},
                                {text: "После этого мы отправим код подтверждения"},
                                {text: "После успешного ввода кода подтверждения  у Вас будет возможность придумать новый пароль"}
                            ]} />
                        </div>
                    </div>
                </div>
            </NoAuthWrapper>
        </TitleWrapper>
    )
}

export default Recovery;