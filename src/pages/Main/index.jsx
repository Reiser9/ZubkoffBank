import React from 'react';

import './index.css';

import { CreditCard, CloudNormal, CloudRain, Location, } from '../../components/Icons';
import Button from '../../components/Button';

const Main = () => {
    return (
        <>
            <section className="main-block">
                <div className="container">
                    <div className="main-block__inner">
                        <div className="main-block__content">
                            <h1 className="main-block__title">Привет 👋</h1>
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
            </section>
            <section className="credit-card">
                <div className="container">
                    <div className="credit-card__inner">
                        <div className="credit-card__content">
                            <h2 className="credit-card__title">Получите кредитную карту онлайн!</h2>
                            <p className="credit-card__text">Воспользуйтесь нашей системой подбора кредитных карт с <span>бесплатной проверкой кредитного рейтинга!</span></p>
                            <Button className="credit-card__button">
                                Оформить карту
                            </Button>
                        </div>
                        <CreditCard className="credit-card__icon" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Main;