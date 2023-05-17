import React from 'react';

import './index.css';

const getCardColor = (cardName) => {
    switch (cardName) {
        case "Junior":
            return "bil-payment_junior";
        case "Platinum":
            return "bil-payment_platinum";
        case "Drive":
            return "bil-payment_drive";
        default:
            return "bil-payment_black";
    }
}

const CardItem = ({cardName, balance, cardNumber, active = false}) => {
    return (
        <div className={`bil-payment__wrapper${active ? " active" : ""}`}>
            <div className={`bil-payment ${getCardColor(cardName.split(" ")[1])}`}>
                <p className="bil-payment__type">{cardName}</p>

                <p className="bil-payment__balance">{balance} ₽</p>

                <p className="bil-payment__number">{cardNumber}</p>
            </div>
        </div>
    )
}

export default CardItem;