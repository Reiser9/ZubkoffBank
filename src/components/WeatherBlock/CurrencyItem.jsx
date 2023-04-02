import React from 'react';
import { useSelector } from 'react-redux';

import Preloader from '../Preloader';
import ErrorBlock from '../ErrorBlock';

import useCurrency from '../../hooks/useCurrency';

const CurrencyItem = () => {
    const {isLoad, error} = useCurrency();
    const {currency} = useSelector(state => state.api);

    return(
        <div className="course-weather">
            {isLoad ? <Preloader fill /> : error ? <ErrorBlock text="Сервис валют временно недоступен" /> : <>
                <p className="course-weather__label">
                    Курс рубля от ЦБ РФ
                </p>

                <div className="course-weather__info">
                    <p className="course-weather__day">Сегодня</p>

                    <div className="course-weather__currency">
                        <p className="course-weather__currency-name">USD</p>

                        <div className="course-weather__value">₽ {currency.usd}</div>
                    </div>

                    <div className="course-weather__currency">
                        <p className="course-weather__currency-name">EUR</p>

                        <div className="course-weather__value">₽ {currency.eur}</div>
                    </div>
                </div>
            </>}
        </div>
    )
}

export default CurrencyItem;