import React from 'react';
import { Link } from 'react-router-dom';

import '../Sign/index.css';
import './index.css';

import Button from '../../components/Button';
import Input from '../../components/Input';
import NoAuthWrapper from '../../components/Wrappers/NoAuthWrapper';
import TitleWrapper from '../../components/Wrappers/TitleWrapper';
import SignImgBlock from '../../components/SignImgBlock';

const Recovery = () => {
    const [phoneEnter, setPhoneEnter] = React.useState("");
    const [step, setStep] = React.useState(1);

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

                                    {/* стадия 1 */}
                                    {step === 1 &&
                                        <div className="sign__step-inner">
                                            <div className="sign__form">
                                                <Input placeholder="Введите номер телефона" value={phoneEnter} setValue={setPhoneEnter} />
                                            </div>

                                            <Link to="/sign" className="sign__link">Вспомнили пароль?</Link>

                                            <div className="recovery__btns">
                                                <Button className="sign__btn recovery__btn" onClick={() => setStep(2)}>
                                                    Отправить
                                                </Button>
                                            </div>
                                        </div>
                                    }

                                    {/* стадия 2 */}
                                    {step === 2 &&
                                        <div className="sign__step-inner">
                                            <div className="sign__subtitle">
                                                На номер телефона +79123456789 было отправлено СМС с кодом подтверждения
                                            </div>
                                            
                                            <div className="sign__form">
                                                <Input placeholder="Введите номер телефона" value={phoneEnter} setValue={setPhoneEnter} />
                                            </div>

                                            <div className="recovery__btns">
                                                <Button className="sign__btn recovery__btn" onClick={() => setStep(3)}>
                                                    Отправить
                                                </Button>

                                                <div className="recovery__back" onClick={() => setStep(step => step - 1)}>Назад</div>
                                            </div>
                                        </div>
                                    }

                                    {/* стадия 3 */}
                                    {step === 3 &&
                                        <div className="sign__step-inner">
                                            <div className="sign__form">
                                                <Input placeholder="Придумайте новый пароль" value={phoneEnter} setValue={setPhoneEnter} password/>
                                                <Input placeholder="Подтвердите пароль" value={phoneEnter} setValue={setPhoneEnter} password/>
                                            </div>

                                            <div className="recovery__btns">
                                                <Button className="sign__btn recovery__btn">
                                                    Сменить пароль
                                                </Button>

                                                <div className="recovery__back" onClick={() => setStep(step => step - 1)}>Назад</div>
                                            </div>
                                        </div>
                                    }
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