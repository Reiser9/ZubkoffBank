import React from 'react';

import '../Profile/index.css';
import './index.css';

import SidebarItem from '../../components/SidebarItem';
import SidebarTab from '../../components/SidebarTab';
import Button from '../../components/Button';

import { Actions, Add, Arrow, Back, Card, Copy, Data, NotifyOkIcon, User } from '../../components/Icons';

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

    React.useEffect(() => {
        document.title = `${process.env.REACT_APP_BANK_NAME} Bank - Админка`;
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="profile">
            <div className="container">
                <div className="profile__inner">
                    <div className="profile__sidebar hide">
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
                            <div className="item-admin">
                                <div className="item-admin__header">
                                    <div className="item-admin__title">
                                        <div className="item-admin__number">1</div>

                                        <p className="item-admin__name">Зубков Алексей Сергеевич</p>
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
                                                    <p className="section-admin__label">Номер телефона</p>
                                                    
                                                    <p className="section-admin__value">+7(912) 934 32-42</p>
                                                </div>
                                                <div className="section-admin__item">
                                                    <p className="section-admin__label">Пол</p>

                                                    <p className="section-admin__value">Мужской</p>
                                                </div>
                                                <div className="section-admin__item">
                                                    <p className="section-admin__label">День рождения</p>

                                                    <p className="section-admin__value">01.03.2002</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="section-admin active">
                                        <div className="section-admin__header">
                                            <div className="section-admin__title">
                                                <NotifyOkIcon className="section-admin__icon" />
                                                Верификация
                                            </div>

                                            <Arrow className="section-admin__arrow" />
                                        </div>

                                        <div className="section-admin__content">
                                            <div className="section-admin__items">
                                                <div className="section-admin__item">
                                                    <p className="section-admin__label">Серия и номер паспорта</p>

                                                    <p className="section-admin__value">71 15 832742</p>
                                                </div>
                                                <div className="section-admin__item">
                                                    <p className="section-admin__label">Дата выдачи</p>

                                                    <p className="section-admin__value">01.04.2015</p>
                                                </div>
                                                <div className="section-admin__item section-admin__item_full">
                                                    <p className="section-admin__label">Кем выдан</p>

                                                    <p className="section-admin__value">Отделом УФМС России по Тюменской области </p>
                                                </div>
                                            </div>

                                            <Button className="admin__btn">Верифицировать</Button>

                                            <p className="section-admin__text">Пользователь не верифицирован</p>
                                        </div>
                                    </div>

                                    <div className="section-admin active">
                                        <div className="section-admin__header">
                                            <div className="section-admin__title">
                                                <Card className="section-admin__icon" />
                                                Карты
                                            </div>

                                            <Arrow className="section-admin__arrow" />
                                        </div>

                                        <div className="section-admin__content">
                                            <div className="section-admin__items">
                                                <div className="section-admin__item section-admin__item_card">
                                                    <img src="assets/img/card-black.svg" alt="card" className="section-admin__card-img" />

                                                    <div className="section-admin__card-items">
                                                        <div className="section-admin__card-item section-admin__card-item_full">
                                                            <p className="section-admin__label">Номер карты</p>

                                                            <p className="section-admin__value">
                                                                5467 3746 3847 2463
                                                                <Copy className="section-admin__copy-icon" />
                                                            </p>
                                                        </div>

                                                        <div className="section-admin__card-item">
                                                            <p className="section-admin__label">Дата</p>

                                                            <p className="section-admin__value">
                                                                03/29
                                                                <Copy className="section-admin__copy-icon" />
                                                            </p>
                                                        </div>

                                                        <div className="section-admin__card-item">
                                                            <p className="section-admin__label">Cvv</p>

                                                            <p className="section-admin__value">
                                                                667
                                                                <Copy className="section-admin__copy-icon" />
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <p className="section-admin__text-btn section-admin__text-btn_blue">Изменить баланс</p>

                                                    <p className="section-admin__text-btn">Заблокировать</p>
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
                                            <p className="section-admin__text-btn">Заблокировать</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="item-admin active">
                                <div className="item-admin__header">
                                    <div className="item-admin__title">
                                        <div className="item-admin__number">2</div>

                                        <p className="item-admin__name">Ветров Егор Игоревич</p>
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
                                                    <p className="section-admin__label">Номер телефона</p>

                                                    <p className="section-admin__value">+7(912) 934 32-42</p>
                                                </div>
                                                <div className="section-admin__item">
                                                    <p className="section-admin__label">Пол</p>

                                                    <p className="section-admin__value">Мужской</p>
                                                </div>
                                                <div className="section-admin__item">
                                                    <p className="section-admin__label">День рождения</p>

                                                    <p className="section-admin__value">01.03.2002</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="section-admin active">
                                        <div className="section-admin__header">
                                            <div className="section-admin__title">
                                                <NotifyOkIcon className="section-admin__icon" />
                                                Верификация
                                            </div>

                                            <Arrow className="section-admin__arrow" />
                                        </div>

                                        <div className="section-admin__content">
                                            <div className="section-admin__items">
                                                <div className="section-admin__item">
                                                    <p className="section-admin__label">Серия и номер паспорта</p>

                                                    <p className="section-admin__value">71 15 832742</p>
                                                </div>

                                                <div className="section-admin__item">
                                                    <p className="section-admin__label">Дата выдачи</p>

                                                    <p className="section-admin__value">01.04.2015</p>
                                                </div>

                                                <div className="section-admin__item section-admin__item_full">
                                                    <p className="section-admin__label">Кем выдан</p>

                                                    <p className="section-admin__value">Отделом УФМС России по Тюменской области </p>
                                                </div>
                                            </div>

                                            <Button className="admin__btn">Верифицировать</Button>

                                            <p className="section-admin__text">Пользователь не верифицирован</p>
                                        </div>
                                    </div>

                                    <div className="section-admin active">
                                        <div className="section-admin__header">
                                            <div className="section-admin__title">
                                                <Card className="section-admin__icon" />
                                                Карты
                                            </div>

                                            <Arrow className="section-admin__arrow" />
                                        </div>

                                        <div className="section-admin__content">
                                            <div className="section-admin__items">
                                                <div className="section-admin__item section-admin__item_card">
                                                    <img src="assets/img/card-black.svg" alt="card" className="section-admin__card-img" />

                                                    <div className="section-admin__card-items">
                                                        <div className="section-admin__card-item section-admin__card-item_full">
                                                            <p className="section-admin__label">Номер карты</p>

                                                            <p className="section-admin__value">
                                                                5467 3746 3847 2463
                                                                <Copy className="section-admin__copy-icon" />
                                                            </p>
                                                        </div>

                                                        <div className="section-admin__card-item">
                                                            <p className="section-admin__label">Дата</p>

                                                            <p className="section-admin__value">
                                                                03/29
                                                                <Copy className="section-admin__copy-icon" />
                                                            </p>
                                                        </div>

                                                        <div className="section-admin__card-item">
                                                            <p className="section-admin__label">Cvv</p>

                                                            <p className="section-admin__value">
                                                                667
                                                                <Copy className="section-admin__copy-icon" />
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <p className="section-admin__text-btn section-admin__text-btn_blue">Изменить баланс</p>

                                                    <p className="section-admin__text-btn">Заблокировать</p>
                                                </div>

                                                <div className="section-admin__item section-admin__item_card">
                                                    <img src="assets/img/card-black.svg" alt="card" className="section-admin__card-img" />

                                                    <div className="section-admin__card-items">
                                                        <div className="section-admin__card-item section-admin__card-item_full">
                                                            <p className="section-admin__label">Номер карты</p>

                                                            <p className="section-admin__value">
                                                                5467 3746 3847 2463
                                                                <Copy className="section-admin__copy-icon" />
                                                            </p>
                                                        </div>

                                                        <div className="section-admin__card-item">
                                                            <p className="section-admin__label">Дата</p>
                                                            <p className="section-admin__value">
                                                                03/29
                                                                <Copy className="section-admin__copy-icon" />
                                                            </p>
                                                        </div>

                                                        <div className="section-admin__card-item">
                                                            <p className="section-admin__label">Cvv</p>
                                                            <p className="section-admin__value">
                                                                667
                                                                <Copy className="section-admin__copy-icon" />
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <p className="section-admin__text-btn section-admin__text-btn_blue">Изменить баланс</p>

                                                    <p className="section-admin__text-btn">Заблокировать</p>
                                                </div>

                                                <div className="section-admin__item section-admin__item_card">
                                                    <img src="assets/img/card-black.svg" alt="card" className="section-admin__card-img" />

                                                    <div className="section-admin__card-items">
                                                        <div className="section-admin__card-item section-admin__card-item_full">
                                                            <p className="section-admin__label">Номер карты</p>

                                                            <p className="section-admin__value">
                                                                5467 3746 3847 2463
                                                                <Copy className="section-admin__copy-icon" />
                                                            </p>
                                                        </div>

                                                        <div className="section-admin__card-item">
                                                            <p className="section-admin__label">Дата</p>

                                                            <p className="section-admin__value">
                                                                03/29
                                                                <Copy className="section-admin__copy-icon" />
                                                            </p>
                                                        </div>

                                                        <div className="section-admin__card-item">
                                                            <p className="section-admin__label">Cvv</p>

                                                            <p className="section-admin__value">
                                                                667
                                                                <Copy className="section-admin__copy-icon" />
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <p className="section-admin__text-btn section-admin__text-btn_blue">Изменить баланс</p>

                                                    <p className="section-admin__text-btn">Заблокировать</p>
                                                </div>

                                                <div className="section-admin__item section-admin__item_card">
                                                    <img src="assets/img/card-black.svg" alt="card" className="section-admin__card-img" />

                                                    <div className="section-admin__card-items">
                                                        <div className="section-admin__card-item section-admin__card-item_full">
                                                            <p className="section-admin__label">Номер карты</p>

                                                            <p className="section-admin__value">
                                                                5467 3746 3847 2463
                                                                <Copy className="section-admin__copy-icon" />
                                                            </p>
                                                        </div>

                                                        <div className="section-admin__card-item">
                                                            <p className="section-admin__label">Дата</p>

                                                            <p className="section-admin__value">
                                                                03/29
                                                                <Copy className="section-admin__copy-icon" />
                                                            </p>
                                                        </div>

                                                        <div className="section-admin__card-item">
                                                            <p className="section-admin__label">Cvv</p>

                                                            <p className="section-admin__value">
                                                                667
                                                                <Copy className="section-admin__copy-icon" />
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <p className="section-admin__text-btn section-admin__text-btn_blue">Изменить баланс</p>

                                                    <p className="section-admin__text-btn">Заблокировать</p>
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
                                            <p className="section-admin__text-btn">Заблокировать</p>
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
                </div>
            </div>
        </section >
    )
}

export default Admin;