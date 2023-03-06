import React from 'react';
import { Link } from 'react-router-dom';

import '../Profile/index.css';
import './index.css';

import SidebarItem from '../../components/SidebarItem';
import SidebarTab from '../../components/SidebarTab';

import { NotifyOkIcon, Lock, SettingsIcon } from '../../components/Icons';
import Input from '../../components/Input';
import Button from '../../components/Button';

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

    React.useEffect(() => {
        document.title = `${process.env.REACT_APP_BANK_NAME} Bank - Настройки`;
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="profile">
            <div className="container">
                <div className="profile__inner">
                    <div className="profile__sidebar">
                        <SidebarItem title="Настройки">
                            <div className="sidebar__tabs">
                                {settingsTabs.map((data, id) => <SidebarTab key={id} name={data.name} text={data.text} icon={data.icon} tab={tab} setTab={setTab} />)}
                            </div>
                        </SidebarItem>
                    </div>

                    <div className="profile__content">
                        {/* данные */}
                        {tab === "data" &&
                            <div className="setting">
                                <div className="setting__block">
                                    <h4 className="setting__title">Информация</h4>
                                    <div className="setting__items">
                                        <div className="setting__item"><Input readOnly className="setting__input" placeholder="Имя" /></div>
                                        <div className="setting__item"><Input readOnly className="setting__input" placeholder="Фамилия" /></div>
                                        <div className="setting__item"><Input readOnly className="setting__input" placeholder="Отчество" /></div>
                                        <div className="setting__item"><Input readOnly className="setting__input" placeholder="Номер телефона" /></div>
                                        <div className="setting__item"><Input readOnly className="setting__input" placeholder="Пол" /></div>
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
                            </div>
                        }

                        {/* верификация */}
                        {tab === "verify" &&
                            // не верифицировано
                            <div className="setting">
                                <div className="setting__block">
                                    <h4 className="setting__title">Информация</h4>
                                    <div className="setting__items">
                                        <div className="setting__item"><Input className="setting__input" placeholder="Имя" /></div>
                                        <div className="setting__item"><Input className="setting__input" placeholder="Фамилия" /></div>
                                        <div className="setting__item"><Input className="setting__input" placeholder="Отчество" /></div>
                                        <div className="setting__item"><Input className="setting__input" placeholder="Серия и номер паспорта" /></div>
                                        <div className="setting__item"><Input className="setting__input" placeholder="Кем выдан" /></div>
                                        <div className="setting__item"><Input className="setting__input" placeholder="Дата выдачи" /></div>
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
                            </div>

                            // в процессе
                            // <div className="setting">
                            //     <div className="setting__block setting__block_verif">
                            //         <div className="setting__verif-icon--inner setting__verif-icon--inner_process">
                            //             <img src="assets/img/verif-process.svg" alt="icon" className="setting__verif-icon"/>
                            //         </div>
                            //         <h4 className="setting__label setting__label_verif">Данные на этапе проверки, пожалуйста, ожидайте</h4>
                            //     </div>
                            // </div>

                            // верифицировано
                            // <div className="setting">
                            //     <div className="setting__block setting__block_verif">
                            //         <div className="setting__verif-icon--inner setting__verif-icon--inner_process">
                            //             <img src="assets/img/verif-ok.svg" alt="icon" className="setting__verif-icon"/>
                            //         </div>
                            //         <h4 className="setting__label setting__label_verif">Верификация успешно пройдена</h4>
                            //     </div>
                            // </div>
                        }
                        {tab === "save" &&
                            <div className="setting">
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
    )
}

export default Settings;