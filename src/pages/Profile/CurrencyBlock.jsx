import React from 'react';
import { useSelector } from 'react-redux';

import './index.css';

import useCurrency from '../../hooks/useCurrency';

import Preloader from '../../components/Preloader';
import ErrorBlock from '../../components/ErrorBlock';

const CurrencyBlock = () => {
    const { isLoad, error } = useCurrency();
    const {currency} = useSelector(state => state.api);

    return (
        <div className="profile__sidebar--currency--inner">
            {isLoad ? <Preloader small /> : error ? <ErrorBlock text="Сервис временно недоступен" /> : <>
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