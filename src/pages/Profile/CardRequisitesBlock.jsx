import React from 'react';

import './index.css';

import useNotify from '../../hooks/useNotify';
import { maskCardNumber, getFormatCardNumber } from '../../utils/cardNumber';
import { copyToClipboard } from '../../utils/copyToClipboard';
import {getNormalDate} from '../../utils/getNormalDate';

import Input from '../../components/Input';

const CardRequisites = ({card}) => {
    const {cardNum, cvc, expDate} = card;

    const [cardNumData, setCardNumData] = React.useState("");
    const [expDateData, setExpDateData] = React.useState("");
    const [cvcData, setCvcData] = React.useState("");

    const [show, setShow] = React.useState(false);

    const {alertNotify} = useNotify();

    const copy = (text) => {
        copyToClipboard(text);
        alertNotify("Успешно", "Текст скопирован", "success");
    }

    React.useEffect(() => {
        if(cardNum && expDate && cvc){
            setCardNumData(cardNum);
            setExpDateData(getNormalDate(expDate, "MM / YY"));
            setCvcData(cvc);
        }

        return () => setShow(false);
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

            <Input value={show ? getFormatCardNumber(cardNumData) : maskCardNumber(cardNumData)} readOnly="readonly" onClick={() => copy(cardNumData)} />

            <div className="profile__content--card--input--wrapper">
                <Input value={show ? expDateData : "** / **"} readOnly="readonly" onClick={() => copy(expDateData)} />

                <Input value={show ? cvcData : "***"} readOnly="readonly" onClick={() => copy(cvcData)} />
            </div>
        </div>
    )
}

export default CardRequisites;