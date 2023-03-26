import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import '../Admin/index.css';
import '../Profile/index.css';
import './index.css';

import {maskPhone} from '../../utils/maskPhone';

import { NotifyOkIcon, Lock, SettingsIcon, Back } from '../../components/Icons';
import SidebarItem from '../../components/SidebarItem';
import SidebarTab from '../../components/SidebarTab';
import Input from '../../components/Input';
import Button from '../../components/Button';
import AuthWrapper from '../../components/Wrappers/AuthWrapper';
import Preloader from '../../components/Preloader';
import useUser from '../../hooks/useUser';

const settingsTabs = [
    {
        text: "Верификация",
        icon: <NotifyOkIcon />,
        name: "verify"
    },
    {
        text: "Данные",
        icon: <SettingsIcon />,
        name: "data"
    },
    {
        text: "Безопасность",
        icon: <Lock />,
        name: "save"
    }
]

const Settings = () => {
    const [tab, setTab] = React.useState("verify");
    const [active, setActive] = React.useState(false);

    const {userIsLoading} = useSelector(state => state.user);

    const {user} = useUser();

    const {firstName, secondName, middleName, phoneNum, sex} = user;

    React.useEffect(() => {
        document.title = `${process.env.REACT_APP_BANK_NAME} Bank - Настройки`;
        window.scrollTo(0, 0);
    }, []);

    return (
        <AuthWrapper>
            <section className="profile">
                <div className="container">
                    <div className="profile__inner">
                        <div className={`profile__sidebar${active ? " active" : ""}`}>
                            <SidebarItem title="Настройки">
                                <div className="sidebar__tabs">
                                    {settingsTabs.map((data, id) => <SidebarTab key={id} setActive={setActive} name={data.name} text={data.text} icon={data.icon} tab={tab} setTab={setTab} />)}
                                </div>
                            </SidebarItem>
                        </div>

                        <div className={`profile__content${active ? " active" : ""}`}>
                            {tab === "verify" && <>
                                {user.verified === "NOT VERIFIED" && <div className="setting">
                                    <Button className="admin__btn admin__back-btn" onClick={() => setActive(false)}>
                                        <Back className="admin__icon" />
                                        Назад
                                    </Button>

                                    <div className="setting__block">
                                        <h4 className="setting__title">Информация</h4>
                                        <div className="setting__items">
                                            <div className="setting__item"><Input className="setting__input" placeholder="Серия и номер паспорта" /></div>
                                            <div className="setting__item"><Input className="setting__input" placeholder="Кем выдан" /></div>
                                            <div className="setting__item"><Input className="setting__input" placeholder="Дата выдачи" /></div>
                                            <div className="setting__item"><Input className="setting__input" placeholder="Дата рождения" /></div>
                                        </div>
                                    </div>
                                    <div className="setting__block">
                                        <h4 className="setting__title">Пол</h4>
                                        <div className="setting__item">
                                                <Button className="setting__sex-btn">Мужской</Button>
                                                <Button className="setting__sex-btn" disabled>Женский</Button>
                                        </div>
                                    </div>
                                    <Button className="setting__verify-btn">Верифицировать</Button>
                                </div>}

                                {/* <div className="setting">
                                    <div className="setting__block setting__block_verif">
                                        <div className="setting__verif-icon--inner setting__verif-icon--inner_process">
                                            <img src="assets/img/verif-process.svg" alt="icon" className="setting__verif-icon"/>
                                        </div>

                                        <h4 className="setting__label setting__label_verif">Данные на этапе проверки, пожалуйста, ожидайте</h4>
                                    </div>
                                </div> */}

                                {user.verified === "VERIFIED" && <div className="setting">
                                    <div className="setting__block setting__block_verif">
                                        <div className="setting__verif-icon--inner setting__verif-icon--inner_process">
                                            <img src="assets/img/verif-ok.svg" alt="icon" className="setting__verif-icon"/>
                                        </div>
                                        <h4 className="setting__label setting__label_verif">Верификация успешно пройдена</h4>
                                    </div>
                                </div>}
                            </>}

                            {tab === "data" &&
                                <div className="setting">
                                    {userIsLoading
                                    ? <Preloader />
                                    : <>
                                        <Button className="admin__btn admin__back-btn" onClick={() => setActive(false)}>
                                            <Back className="admin__icon" />

                                            Назад
                                        </Button>

                                        <div className="setting__block">
                                            <h4 className="setting__title">Информация</h4>
                                            <div className="setting__items">
                                                <div className="setting__item"><Input value={firstName} readOnly className="setting__input" placeholder="Имя" /></div>
                                                <div className="setting__item"><Input value={secondName} readOnly className="setting__input" placeholder="Фамилия" /></div>
                                                <div className="setting__item"><Input value={middleName} readOnly className="setting__input" placeholder="Отчество" /></div>
                                                <div className="setting__item"><Input value={maskPhone(phoneNum)} readOnly className="setting__input" placeholder="Номер телефона" /></div>
                                                <div className="setting__item"><Input readOnly className="setting__input" placeholder="Пол" /></div>
                                                <div className="setting__item"><Input readOnly className="setting__input" placeholder="Дата рождения" /></div>
                                            </div>
                                        </div>
                                        <div className="setting__block">
                                            <h4 className="setting__title">Паспортные данные</h4>
                                            <div className="setting__items">
                                                <div className="setting__item"><Input readOnly className="setting__input" placeholder="Серия и номер паспорта" /></div>
                                                <div className="setting__item"><Input readOnly className="setting__input" placeholder="Кем выдан" /></div>
                                                <div className="setting__item"><Input readOnly className="setting__input" placeholder="Дата выдачи" /></div>
                                            </div>
                                        </div>
                                    </>}
                                </div>
                            }

                            {tab === "save" &&
                                <div className="setting">
                                    <Button className="admin__btn admin__back-btn" onClick={() => setActive(false)}>
                                        <Back className="admin__icon" />
                                        Назад
                                    </Button>

                                    <div className="setting__block">
                                        <h4 className="setting__title">Смена пароля</h4>
                                        <div className="setting__items">
                                            <div className="setting__item"><Input className="setting__input" placeholder="Старый пароль" password /></div>
                                            <div className="setting__item"><Input className="setting__input" placeholder="Новый пароль" password /></div>
                                            <div className="setting__item"><Input className="setting__input" placeholder="Повторите новый пароль" password /></div>
                                            <Button className="setting__item setting__item_btn">Изменить</Button>
                                        </div>
                                    </div>
                                    <Link className="setting__delete-account-btn">Удалить аккаунт</Link>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </AuthWrapper>
    )
}

export default Settings;