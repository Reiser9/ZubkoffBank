import React from 'react';
import { useSelector } from 'react-redux';

import './index.css';

import {getCardColor} from '../../utils/getCardColor';
import { findElementById } from '../../utils/findElement';
import { maskCardNumber } from '../../utils/cardNumber';

const CardItem = ({data, changeCardPay, active = false}) => {
    const {balance, cardNum, typeId, id} = data;

    const [currentCardType, setCurrentCardType] = React.useState("");
    const [cardName, setCardName] = React.useState("");

    const {cardTypes} = useSelector(state => state.cardTypes);

    React.useEffect(() => {
        const currentCard = findElementById(cardTypes.content, typeId);
        setCurrentCardType(currentCard);
        setCardName(currentCard.name);
    }, []);

    return (
        <div className={`bil-payment__wrapper${active ? " active" : ""}`} onClick={() => changeCardPay(id)}>
            <div className={`bil-payment ${getCardColor(cardName)}`}>
                <p className="bil-payment__type">{`${process.env.REACT_APP_BANK_NAME} ${currentCardType.name}`}</p>

                <p className="bil-payment__balance">{balance.toLocaleString()} ₽</p>

                <p className="bil-payment__number">{maskCardNumber(cardNum, true)}</p>
            </div>
        </div>
    )
}

export default CardItem;