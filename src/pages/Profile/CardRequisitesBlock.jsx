import React from 'react';

import './index.css';

import useNotify from '../../hooks/useNotify';
import { maskCardNumber, getFormatCardNumber } from '../../utils/cardNumber';
import { copyToClipboard } from '../../utils/copyToClipboard';
import {getNormalDate} from '../../utils/getNormalDate';

import Input from '../../components/Input';

const CardRequisites = ({card}) => {
    const {cardNum, cvc, expDate} = card;

    const [show, setShow] = React.useState(false);

    const {alertNotify} = useNotify();

    const copy = (text) => {
        copyToClipboard(text);
        alertNotify("Успешно", "Текст скопирован", "success");
    }

    React.useEffect(() => {
        setShow(false);
    }, [card]);

    return (
        <div className="profile__content--card--data">
            <div className="profile__content--card--data--title--inner">
                <p className="profile__content--card--data--title">
                    Реквизиты карты
                </p>

                <p className="profile__content--card--data--show" onClick={() => setShow(prev => !prev)}>
                    {show ? "Скрыть" : "Показать"}
                </p>
            </div>

            <Input value={show ? getFormatCardNumber(cardNum) : maskCardNumber(cardNum)} readOnly="readonly" onClick={() => copy(cardNum)} />

            <div className="profile__content--card--input--wrapper">
                <Input value={show ? getNormalDate(expDate, "MM / YY") : "** / **"} readOnly="readonly" onClick={() => copy(getNormalDate(expDate, "MM / YY"))} />

                <Input value={show ? cvc : "***"} readOnly="readonly" onClick={() => copy(cvc)} />
            </div>
        </div>
    )
}

export default CardRequisites;