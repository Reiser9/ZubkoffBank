import React from 'react';

import './index.css';

import {getCardColor} from '../../utils/getCardColor';
import { maskCardNumber } from '../../utils/cardNumber';

const CardItem = ({data, changeCardPay, active = false}) => {
    const {balance, cardNum, type, id} = data;

    return (
        <div className={`bil-payment__wrapper${active ? " active" : ""}`} onClick={() => changeCardPay(id)}>
            <div className={`bil-payment ${getCardColor(type?.name)}`}>
                <p className="bil-payment__type">{`${process.env.REACT_APP_BANK_NAME} ${type?.name}`}</p>

                <p className="bil-payment__balance">{balance?.toLocaleString()} ₽</p>

                <p className="bil-payment__number">{maskCardNumber(cardNum, true)}</p>
            </div>
        </div>
    )
}

export default CardItem;