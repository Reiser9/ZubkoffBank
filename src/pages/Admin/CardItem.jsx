import React from 'react';

import './index.css';

import { Copy } from '../../components/Icons';

const CardItem = ({data}) => {
    const {cardNum, cvc, expDate, balance} = data;

    return (
        <div className="section-admin__item section-admin__item_card">
            <img src="assets/img/card-black.svg" alt="card" className="section-admin__card-img" />

            <div className="section-admin__card-items">
                <div className="section-admin__card-item section-admin__card-item_full">
                    <p className="section-admin__label">Номер карты</p>

                    <p className="section-admin__value">
                        5467 3746 3847 2463

                        <Copy className="section-admin__copy-icon" />
                    </p>
                </div>

                <div className="section-admin__card-item">
                    <p className="section-admin__label">Дата</p>

                    <p className="section-admin__value">
                        03/29

                        <Copy className="section-admin__copy-icon" />
                    </p>
                </div>

                <div className="section-admin__card-item">
                    <p className="section-admin__label">Cvv</p>

                    <p className="section-admin__value">
                        667

                        <Copy className="section-admin__copy-icon" />
                    </p>
                </div>
            </div>

            <p className="section-admin__text-btn section-admin__text-btn_blue">Изменить баланс</p>

            <p className="section-admin__text-btn">Заблокировать</p>
        </div>
    )
}

export default CardItem;