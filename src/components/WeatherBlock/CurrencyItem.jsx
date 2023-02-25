import React from 'react';

import {getCurrency} from '../../utils/getApiData';

import PreloaderFill from '../Preloader/PreloaderFill';
import ErrorBlock from '../ErrorBlock';

const CurrencyItem = () => {
    const [isLoad, setIsLoad] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [currency, setCurrency] = React.useState({});

    const getCurrencyData = async () => {
        setIsLoad(true);

        const {currencyUsd, currencyEur, error} = await getCurrency();
        
        if(error){
            setError(true);
        }
        else{
            setCurrency({
                usd: currencyUsd,
                eur: currencyEur
            });
        }

        setIsLoad(false);
    }

    React.useEffect(() => {
        getCurrencyData();
    }, []);

    return(
        <div className="course-weather">
            {isLoad ? <PreloaderFill /> : error ? <ErrorBlock text="Сервис временно недоступен" /> : <>
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