import React from 'react';

import './index.css';

import {CreditCard} from '../../components/Icons';
import Button from '../../components/Button';
import WeatherBlock from '../../components/WeatherBlock';

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

                        <WeatherBlock />
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