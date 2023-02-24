import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';

import { CreditCard, CloudNormal, CloudRain, Location, Dollar, Fast, Phone, Invest, Card, Percent } from '../../components/Icons';
import Button from '../../components/Button';

const Main = () => {
    return (
        <>
            {/* <section className="main-block">
                <div className="container">
                    <div className="main-block__inner">
                        <div className="main-block__content">
                            <h1 className="main-block__title title">Привет 👋</h1>
                            <p className="main-block__text">Здесь, в Zubkoff, мы придумываем отличные сервисы для людей в России. Все, что мы разрабатываем, пишем или рекомендуем - сделано с любовью.</p>
                            <Button className="main-block__button">
                                Попробовать
                            </Button>
                        </div>
                        <div className="weather">
                            <div className="weather__inner">
                                <div className="weather__info">
                                    <div className="weather__location">
                                        <Location className="weather__location--icon" />
                                        <p className="weather__city">Тюмень</p>
                                    </div>
                                    <div className="weather__dot"></div>
                                    <div className="weather__time">3:59</div>
                                </div>
                                <div className="weather__temp">
                                    <CloudNormal className="weather__temp--icon" />
                                    <div className="weather__current-temp">
                                        <p className="weather__current-temp">-12°</p>
                                        <p className="weather__name">Туман</p>
                                    </div>
                                </div>
                                <div className="weather__items">
                                    <div className="item-weather">
                                        <div className="item-weather__time">Утро</div>
                                        <div className="item-weather__temp">
                                            <CloudNormal className="item-weather--icon" />
                                            <p className="item-weather__value">-10.4°</p>
                                        </div>
                                    </div>
                                    <div className="item-weather">
                                        <div className="item-weather__time">День</div>
                                        <div className="item-weather__temp">
                                            <CloudNormal className="item-weather--icon" />
                                            <p className="item-weather__value">-10.4°</p>
                                        </div>
                                    </div>
                                    <div className="item-weather">
                                        <div className="item-weather__time">Вечер</div>
                                        <div className="item-weather__temp">
                                            <CloudNormal className="item-weather--icon" />
                                            <p className="item-weather__value">-10.4°</p>
                                        </div>
                                    </div>
                                    <div className="item-weather">
                                        <div className="item-weather__time">Ночь</div>
                                        <div className="item-weather__temp">
                                            <CloudNormal className="item-weather--icon" />
                                            <p className="item-weather__value">-10.4°</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="course-weather">
                                    <p className="course-weather__label">Курс рубля от ЦБ РФ на сегодня</p>
                                    <div className="course-weather__info">
                                        <p className="course-weather__day">Сегодня</p>
                                        <div className="course-weather__currency">
                                            <p className="course-weather__currency-name">USD</p>
                                            <div className="course-weather__value">₽ 74.76</div>
                                        </div>
                                        <div className="course-weather__currency">
                                            <p className="course-weather__currency-name">EUR</p>
                                            <div className="course-weather__value">₽ 74.76</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            <section className="credit-card">
                <div className="container">
                    <div className="credit-card__inner">
                        <div className="credit-card__content">
                            <h2 className="credit-card__title title">Получите кредитную карту онлайн!</h2>
                            <p className="credit-card__text">Воспользуйтесь нашей системой подбора кредитных карт с <span>бесплатной проверкой кредитного рейтинга!</span></p>
                            <Button className="credit-card__button">
                                Оформить карту
                            </Button>
                        </div>
                        <CreditCard className="credit-card__icon" />
                    </div>
                </div>
            </section>
            <section className="services">
                <div className="container">
                    <div className="services__inner">
                        <h2 className="services__title title">Сервисы и услуги</h2>
                        <div className="services__items">
                            <div className="item-services">
                                <div className="item-services__icon--inner">
                                    <Invest className="item-services__icon" />
                                </div>
                                <h4 className="item-services__title">Zubkoff Инвестиции</h4>
                                <p className="item-services__text">Понятные тарифы и удобное приложение</p>
                                <Button className="item-services__button">В личный кабинет</Button>
                            </div>
                            <div className="item-services">
                                <div className="item-services__icon--inner">
                                    <Card className="item-services__icon" />
                                </div>
                                <h4 className="item-services__title">Дебетовая карта Zubkoff Black</h4>
                                <p className="item-services__text">Лимит до 700 000 ₽. Рассрочка без процентов до года</p>
                                <Button className="item-services__button">Оформить карту</Button>
                            </div>
                            <div className="item-services">
                                <div className="item-services__icon--inner">
                                    <Dollar className="item-services__icon" />
                                </div>
                                <h4 className="item-services__title">Вклады</h4>
                                <p className="item-services__text">Откройте вклад с пополнением и частичным изъятием. Каждый месяц получайте проценты на карту или вклад</p>
                            </div>
                            <div className="item-services item-services_big">
                                <div className="item-services__icon--inner">
                                    <Fast className="item-services__icon" />
                                </div>
                                <h4 className="item-services__title">Система быстрых платежей</h4>
                                <p className="item-services__text">Оплачивайте покупки быстро и безопасно – в магазинах
                                    и на сайтах, в мессенджерах и социальных сетях. Без карты,
                                    нужен только смартфон.</p>
                            </div>
                            <div className="item-services item-services_big">
                                <div className="item-services__icon--inner">
                                    <Phone className="item-services__icon" />
                                </div>
                                <h4 className="item-services__title">Zubkoff Mobile</h4>
                                <p className="item-services__text">Откройте вклад с пополнением и частичным изъятием. Каждый месяц получайте проценты на карту или вклад</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="cashback">
                <div className="container">
                    <div className="cashback__inner">
                        <h2 className="cashback__title title">Кэшбек с Zubkoff Black</h2>
                        <div className="cashback__items">
                            <div className="item-cashback">
                                <div className="item-cashback__icons">
                                    <img src="assets/img/cashback/01.svg" alt="icon" className="item-cashback__icon" />
                                    <img src="assets/img/cashback/02.svg" alt="icon" className="item-cashback__icon" />
                                    <img src="assets/img/cashback/03.svg" alt="icon" className="item-cashback__icon" />
                                </div>
                                <h4 className="item-cashback__title">До 30% у партнеров</h4>
                                <p className="item-cashback__text">Самый большой кэшбэк — за покупки по спецпредложениям партнеров банка</p>
                            </div>
                            <div className="item-cashback">
                                <div className="item-cashback__icons">
                                    <img src="assets/img/cashback/03.svg" alt="icon" className="item-cashback__icon" />
                                    <img src="assets/img/cashback/04.svg" alt="icon" className="item-cashback__icon" />
                                    <img src="assets/img/cashback/05.svg" alt="icon" className="item-cashback__icon" />
                                </div>
                                <h4 className="item-cashback__title">До 15% кэшбэка</h4>
                                <p className="item-cashback__text">Каждый месяц выбирайте четыре категории покупок, в которых будете получать кэшбэк</p>
                            </div>
                            <div className="item-cashback item-cashback_light">
                                <div className="item-cashback__icons">
                                    <div className="item-cashback__icon--inner">
                                        <Percent className="item-cashback__icon item-cashback__icon_small" />
                                    </div>
                                </div>
                                <h4 className="item-cashback__title">До 15% кэшбэка</h4>
                                <p className="item-cashback__text">Каждый месяц выбирайте четыре категории покупок, в которых будете получать кэшбэк</p>
                            </div>
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
                            <div className="faq__item">
                                <div className="faq__question">
                                    Как сделать быстрый перевод в Zubkoff?
                                    <div className="faq__btn active"></div>
                                </div>
                                <div className="faq__answer active">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis molestiae nam animi corrupti hic, quia exercitationem incidunt eveniet praesentium veniam. Debitis neque laboriosam odit quibusdam nam temporibus dolore excepturi. Officiis!</div>
                            </div>
                            <div className="faq__item">
                                <div className="faq__question">
                                    Как сделать быстрый перевод в Zubkoff?
                                    <div className="faq__btn"></div>
                                </div>
                                <div className="faq__answer">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis molestiae nam animi corrupti hic, quia exercitationem incidunt eveniet praesentium veniam. Debitis neque laboriosam odit quibusdam nam temporibus dolore excepturi. Officiis!</div>
                            </div>
                            <div className="faq__item">
                                <div className="faq__question">
                                    Как сделать быстрый перевод в Zubkoff?
                                    <div className="faq__btn"></div>
                                </div>
                                <div className="faq__answer">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis molestiae nam animi corrupti hic, quia exercitationem incidunt eveniet praesentium veniam. Debitis neque laboriosam odit quibusdam nam temporibus dolore excepturi. Officiis!</div>
                            </div>
                            <div className="faq__item">
                                <div className="faq__question">
                                    Как сделать быстрый перевод в Zubkoff?
                                    <div className="faq__btn"></div>
                                </div>
                                <div className="faq__answer">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis molestiae nam animi corrupti hic, quia exercitationem incidunt eveniet praesentium veniam. Debitis neque laboriosam odit quibusdam nam temporibus dolore excepturi. Officiis!</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Main;