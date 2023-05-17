import React from 'react';
import { useSelector } from 'react-redux';

import './index.css';

import useNotify from '../../hooks/useNotify';
import useAdmin from '../../hooks/useAdmin';
import { getFormatCardNumber } from '../../utils/cardNumber';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { getNormalDate } from '../../utils/getNormalDate';
import { findElementById } from '../../utils/findElement';

import { Copy } from '../../components/Icons';

const CardItem = ({data, userId}) => {
    const {id, cardNum, cvc, expDate, balance, lock, typeId} = data;

    const [img, setImg] = React.useState("");

    const {alertNotify} = useNotify();
    const {blockCard, unblockCard} = useAdmin();
    const {cardTypes} = useSelector(state => state.cardTypes);

    const copy = (text) => {
        copyToClipboard(text);
        alertNotify("Успешно", "Текст скопирован", "success");
    }

    React.useEffect(() => {
        const currentCard = findElementById(cardTypes.content, typeId);
        setImg(currentCard?.img);
    }, [typeId]);

    return (
        <div className="section-admin__item section-admin__item_card">
            <div className="section-admin__card-img-inner">
                <img src={img} alt="card" className="section-admin__card-img" />
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
                        {balance} ₽
                    </p>
                </div>
            </div>

            <p className="section-admin__text-btn section-admin__text-btn_blue">Изменить баланс</p>

            {lock
            ? <p className="section-admin__text-btn" onClick={() => unblockCard(id, userId)}>Разблокировать</p>
            : <p className="section-admin__text-btn" onClick={() => blockCard(id, userId)}>Заблокировать</p>}
        </div>
    )
}

export default CardItem;