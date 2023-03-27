import React from 'react';

import './index.css';

import { Actions, Add, Arrow, Back, Card, Copy, Data, NotifyOkIcon, User } from '../../components/Icons';
import SidebarItem from '../../components/SidebarItem';
import SidebarTab from '../../components/SidebarTab';
import Button from '../../components/Button';
import PageSidebarInner from '../../components/PageSidebarInner';
import UserItem from './AdminItem';

const settingsTabs = [
    {
        text: "Пользователи",
        icon: <User />,
        name: "users"
    },
    {
        text: "Карты",
        icon: <Card />,
        name: "cards"
    },
]

const Admin = () => {
    const [tab, setTab] = React.useState("users");

    return (
        <PageSidebarInner pageTitle="Админка">
            <div className="profile__sidebar">
                <SidebarItem title="Админка">
                    <div className="sidebar__tabs">
                        {settingsTabs.map((data, id) => <SidebarTab key={id} name={data.name} text={data.text} icon={data.icon} tab={tab} setTab={setTab} />)}
                    </div>
                </SidebarItem>
            </div>

            {tab === "users" && <div className="profile__content admin__content">
                <Button className="admin__btn admin__back-btn">
                    <Back className="admin__icon" />
                    Назад
                </Button>

                <div className="admin__header admin__header_users">
                    <h2 className="admin__title">Пользователи (<span>2</span>)</h2>

                    <div className="limit">
                        <p className="limit__label">Показывать по:</p>

                        <div className="number__btns">
                            <div className="number__btn active">5</div>

                            <div className="number__btn">10</div>

                            <div className="number__btn">20</div>
                        </div>
                    </div>
                </div>

                <div className="admin__items">
                    <UserItem data={{
                        id: 1,
                        phoneNum: "+79923074831",
                        accountNum: "6162370",
                        verify: "NOT VERIFIED",
                        roles: [
                            {
                                id: 1,
                                role: "user"
                            },
                            {
                                id: 2,
                                role: "admin"
                            }
                        ],
                        cards: [],
                        dataUsers: {
                            id: 1,
                            firstName: "Егор",
                            secondName: "Зубков",
                            middleName: "Амирханович",
                            passportNum: "123456",
                            passportSer: "5435",
                            grantedDate: "2018-03-26T20:20:57.727+00:00",
                            granted: "УФМС г. Тюмень",
                            birthdate: "2002-03-26T20:20:57.727+00:00",
                            sex: true,
                            userId: 1
                        }
                    }} />
                </div>

                <div className="number__btns pagination">
                    <div className="number__btn active">1</div>

                    <div className="number__btn">2</div>

                    <div className="number__btn">3</div>
                </div>
            </div>}

            {tab === "cards" && <div className="profile__content admin__content active">
                <Button className="admin__btn admin__back-btn">
                    <Back className="admin__icon" />
                    Назад
                </Button>

                <div className="admin__header admin__header_cards">
                    <h2 className="admin__title">Типы карт (<span>2</span>)</h2>

                    <Button className="admin__btn">
                        <Add className="admin__icon" />
                        Добавить тип
                    </Button>
                </div>

                <div className="admin__items">
                    <div className="item-admin active">
                        <div className="item-admin__header">
                            <div className="item-admin__title">
                                <div className="item-admin__number">1</div>

                                <p className="item-admin__name">Black</p>
                            </div>

                            <div className="item-admin__open-btn">
                                <Arrow className="item-admin__arrow" />
                            </div>
                        </div>

                        <div className="item-admin__content">
                            <div className="section-admin">
                                <div className="section-admin__header">
                                    <div className="section-admin__title">
                                        <Data className="section-admin__icon" />
                                        Данные
                                    </div>

                                    <Arrow className="section-admin__arrow" />
                                </div>

                                <div className="section-admin__content">
                                    <div className="section-admin__items">
                                        <div className="section-admin__item">
                                            <p className="section-admin__label">Лимит</p>

                                            <p className="section-admin__value">100.000 ₽</p>
                                        </div>

                                        <div className="section-admin__item">
                                            <p className="section-admin__label">Изображение карты</p>

                                            <img src="assets/img/card-black.svg" alt="card" className="section-admin__card-img" />
                                        </div>

                                        <div className="section-admin__item section-admin__item_full">
                                            <p className="section-admin__label">Описание</p>

                                            <p className="section-admin__value">Наша лучшая карта, которая зарабатывает деньги. Получайте кэшбэк и процент на остаток, снимайте наличные бесплатно. Действует в 9 странах. Подключается к Mir Pay</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="section-admin">
                                <div className="section-admin__header">
                                    <div className="section-admin__title">
                                        <Actions className="section-admin__icon" />
                                        Действия
                                    </div>

                                    <Arrow className="section-admin__arrow" />
                                </div>

                                <div className="section-admin__content">
                                    <p className="section-admin__text-btn">Удалить</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="item-admin active">
                        <div className="item-admin__header">
                            <div className="item-admin__title">
                                <div className="item-admin__number">2</div>

                                <p className="item-admin__name">Junior</p>
                            </div>

                            <div className="item-admin__open-btn">
                                <Arrow className="item-admin__arrow" />
                            </div>
                        </div>

                        <div className="item-admin__content">
                            <div className="section-admin active">
                                <div className="section-admin__header">
                                    <div className="section-admin__title">
                                        <Data className="section-admin__icon" />
                                        Данные
                                    </div>

                                    <Arrow className="section-admin__arrow" />
                                </div>

                                <div className="section-admin__content">
                                    <div className="section-admin__items">
                                        <div className="section-admin__item">
                                            <p className="section-admin__label">Лимит</p>

                                            <p className="section-admin__value">100.000 ₽</p>
                                        </div>

                                        <div className="section-admin__item">
                                            <p className="section-admin__label">Изображение карты</p>

                                            <img src="assets/img/card-black.svg" alt="card" className="section-admin__card-img" />
                                        </div>

                                        <div className="section-admin__item section-admin__item_full">
                                            <p className="section-admin__label">Описание</p>

                                            <p className="section-admin__value">Наша лучшая карта, которая зарабатывает деньги. Получайте кэшбэк и процент на остаток, снимайте наличные бесплатно. Действует в 9 странах. Подключается к Mir Pay</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="section-admin active">
                                <div className="section-admin__header">
                                    <div className="section-admin__title">
                                        <Actions className="section-admin__icon" />
                                        Действия
                                    </div>

                                    <Arrow className="section-admin__arrow" />
                                </div>

                                <div className="section-admin__content">
                                    <p className="section-admin__text-btn">Удалить</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="number__btns pagination">
                    <div className="number__btn active">1</div>

                    <div className="number__btn">2</div>
                    
                    <div className="number__btn">3</div>
                </div>
            </div>}
        </PageSidebarInner>
    )
}

export default Admin;