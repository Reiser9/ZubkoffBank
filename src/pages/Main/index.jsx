import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';

import { Dollar, Fast, Phone, Invest, Card } from '../../components/Icons';

import Button from '../../components/Button';
import WeatherBlock from '../../components/WeatherBlock';
import ServiceItem from '../../components/ServiceItem';
import CashbackItem from '../../components/CashbackItem';
import FaqItem from '../../components/FaqItem';

const Main = () => {
    return (
        <>
            <section className="main-block">
                <div className="container">
                    <div className="main-block__inner">
                        <div className="main-block__content">
                            <h1 className="main-block__title title">Привет 👋</h1>
                            <p className="main-block__text">Здесь, в {process.env.REACT_APP_BANK_NAME}, мы придумываем отличные сервисы для людей в России. Все, что мы разрабатываем, пишем или рекомендуем - сделано с любовью.</p>
                            
                            <Button className="main-block__button">
                                Попробовать
                            </Button>
                        </div>

                        <WeatherBlock />
                    </div>
                </div>
            </section>

            <section className="credit-card">
                <div className="container">
                    <div className="credit-card__inner">
                        <div className="credit-card__content">
                            <h2 className="credit-card__title title">Получите дебетовую карту онлайн!</h2>
                            
                            <p className="credit-card__text">Воспользуйтесь нашей системой подбора дебетовых карт с <span>бесплатной проверкой рейтинга!</span></p>
                            
                            <Button className="credit-card__button">
                                Оформить карту
                            </Button>
                        </div>

                        <img src="/assets/img/card.svg" alt="card" className="credit-card__icon" />
                    </div>
                </div>
            </section>

            <section className="services">
                <div className="container">
                    <div className="services__inner">
                        <h2 className="services__title title">Сервисы и услуги</h2>

                        <div className="services__items">
                            <ServiceItem icon={<Invest className="item-services__icon" />} title={`${process.env.REACT_APP_BANK_NAME} Инвестиции`} text="Понятные тарифы и удобное приложение" buttonText="В личный кабинет" />

                            <ServiceItem icon={<Card className="item-services__icon" />} title={`Дебетовая карта ${process.env.REACT_APP_BANK_NAME} Black`} text="Лимит до 700 000 ₽. Рассрочка без процентов до года" buttonText="Оформить карту" />

                            <ServiceItem icon={<Dollar className="item-services__icon" />} title="Вклады" text="Откройте вклад с пополнением и частичным изъятием. Каждый месяц получайте проценты на карту или вклад" />

                            <ServiceItem icon={<Fast className="item-services__icon" />} title="Система быстрых платежей" text="Оплачивайте покупки быстро и безопасно – в магазинах и на сайтах, в мессенджерах и социальных сетях. Без карты, нужен только смартфон." big />

                            <ServiceItem icon={<Phone className="item-services__icon" />} title={`${process.env.REACT_APP_BANK_NAME} Mobile`} text="Откройте вклад с пополнением и частичным изъятием. Каждый месяц получайте проценты на карту или вклад" big />
                        </div>
                    </div>
                </div>
            </section>

            <section className="cashback">
                <div className="container">
                    <div className="cashback__inner">
                        <h2 className="cashback__title title">Кэшбек с {process.env.REACT_APP_BANK_NAME} Black</h2>

                        <div className="cashback__items">
                            <CashbackItem title="До 30% у партнеров" text="Самый большой кэшбэк — за покупки по спецпредложениям партнеров банка" />

                            <CashbackItem title="До 15% кэшбэка" text="Каждый месяц выбирайте четыре категории покупок, в которых будете получать кэшбэк" />

                            <CashbackItem title="До 6% на остаток" text={`Ежемесячно получайте до 6% годовых с подпиской ${process.env.REACT_APP_BANK_NAME} Pro`} light />
                        </div>
                    </div>
                </div>
            </section>

            <section className="banner">
                <div className="container">
                    <div className="banner__inner">
                        <div className="banner__image ibg">
                            <img src="assets/img/phone.png" alt="banner" />
                        </div>

                        <div className="banner__icons">
                            <div className="banner__icon--inner banner__icon--inner_qr">
                                <img src="assets/img/qr.svg" alt="qr" className="banner__icon" />
                            </div>

                            <div className="banner__icon--inner banner__icon--inner_logo">
                                <img src="assets/img/logo-only.svg" alt="logo" className="banner__icon" />
                            </div>
                        </div>

                        <div className="banner__text-block">
                            <h2 className="banner__title title">Лучший системы быстрых платежей банк в мире</h2>

                            <p className="banner__text">По версии Global Finance — Best Digital Bank Award 2020</p>
                        </div>

                        <div className="banner__downloads">
                            <Link to="/" className="banner__link">
                                <img src="assets/img/play-market.svg" alt="play-market" />
                            </Link>

                            <Link to="/" className="banner__link">
                                <img src="assets/img/app-store.svg" alt="app-store" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="faq">
                <div className="container">
                    <div className="faq__inner">
                        <h2 className="faq__title title">Часто задаваемые вопросы</h2>

                        <div className="faq__items">
                            <FaqItem title={`Как сделать быстрый перевод в ${process.env.REACT_APP_BANK_NAME}?`} text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis molestiae nam animi corrupti hic, quia exercitationem incidunt eveniet praesentium veniam. Debitis neque laboriosam odit quibusdam nam temporibus dolore excepturi. Officiis!" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Main;