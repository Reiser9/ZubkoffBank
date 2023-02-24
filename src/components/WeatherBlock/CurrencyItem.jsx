import React from 'react';

import {getCurrency} from '../../utils/getCity';

import PreloaderFill from '../Preloader/PreloaderFill';

const CurrencyItem = () => {
    const [isLoad, setIsLoad] = React.useState(false);

    const [currency, setCurrency] = React.useState({});

    const getCurrencyData = async () => {
        setIsLoad(true);

        const currencyUsd = await getCurrency("USD");
        const currencyEur = await getCurrency("EUR");

        setCurrency({
            usd: currencyUsd,
            eur: currencyEur
        });
        
        setIsLoad(false);
    }

    React.useEffect(() => {
        getCurrencyData();
    }, []);

    return(
        <div className="course-weather">
            {isLoad ? <PreloaderFill /> : <>
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