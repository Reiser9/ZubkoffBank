import React from 'react';

import './index.css';

import useNotify from '../../hooks/useNotify';
import useAdmin from '../../hooks/useAdmin';
import { getFormatCardNumber } from '../../utils/cardNumber';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { getNormalDate } from '../../utils/getNormalDate';

import { Copy } from '../../components/Icons';

const CardItem = ({data, userId}) => {
    const {id, cardNum, cvc, expDate, balance, lock, type} = data;

    const {alertNotify} = useNotify();
    const {blockCard, unblockCard, changeBalance} = useAdmin();

    const copy = (text) => {
        copyToClipboard(text);
        alertNotify("Успешно", "Текст скопирован", "success");
    }

    const changeBalanceHandler = () => {
        changeBalance(id, 50, userId);
    }

    return (
        <div className="section-admin__item section-admin__item_card">
            <div className="section-admin__card-img-inner">
                <img src={type.img} alt="card" className="section-admin__card-img" />
            </div>

            <div className="section-admin__card-items">
                <div className="section-admin__card-item section-admin__card-item_full">
                    <p className="section-admin__label">Номер карты</p>

                    <p className="section-admin__value">
                        {getFormatCardNumber(cardNum)}

                        <Copy className="section-admin__copy-icon" onClick={() => copy(cardNum)} />
                    </p>
                </div>

                <div className="section-admin__card-item">
                    <p className="section-admin__label">Дата</p>

                    <p className="section-admin__value">
                        {getNormalDate(expDate, "MM/YY")}
                    </p>
                </div>

                <div className="section-admin__card-item">
                    <p className="section-admin__label">Cvv</p>

                    <p className="section-admin__value">
                        {cvc}
                    </p>
                </div>

                <div className="section-admin__card-item">
                    <p className="section-admin__label">Баланс</p>

                    <p className="section-admin__value">
                        {balance.toLocaleString()} ₽
                    </p>
                </div>
            </div>

            <p className="section-admin__text-btn section-admin__text-btn_blue" onClick={changeBalanceHandler}>Изменить баланс</p>

            {lock
            ? <p className="section-admin__text-btn" onClick={() => unblockCard(id, userId)}>Разблокировать</p>
            : <p className="section-admin__text-btn" onClick={() => blockCard(id, userId)}>Заблокировать</p>}
        </div>
    )
}

export default CardItem;