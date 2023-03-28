import React from 'react';

import './index.css';

import useCurrency from '../../hooks/useCurrency';

import Preloader from '../../components/Preloader';
import ErrorBlock from '../../components/ErrorBlock';

const CurrencyBlock = () => {
    const { isLoadCurrency, errorCurrency, currency } = useCurrency();

    return (
        <div className="profile__sidebar--currency--inner">
            {isLoadCurrency ? <Preloader small /> : errorCurrency ? <ErrorBlock text="Сервис временно недоступен" /> : <>
                <div className="profile__sidebar--currency--item">
                    <p className="profile__sidebar--currency--title">
                        USD
                    </p>

                    <p className="profile__sidebar--currency--value">
                        ₽ {currency.usd}
                    </p>
                </div>

                <div className="profile__sidebar--currency--item">
                    <p className="profile__sidebar--currency--title">
                        EUR
                    </p>

                    <p className="profile__sidebar--currency--value">
                        ₽ {currency.eur}
                    </p>
                </div>
            </>}
        </div>
    )
}

export default CurrencyBlock;