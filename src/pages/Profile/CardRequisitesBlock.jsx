import React from 'react';

import './index.css';

import Input from '../../components/Input';

const CardRequisites = () => {
    return (
        <div className="profile__content--card--data">
            <div className="profile__content--card--data--title--inner">
                <p className="profile__content--card--data--title">
                    Реквизиты карты
                </p>

                <p className="profile__content--card--data--show">
                    Показать
                </p>
            </div>

            <Input value="**** **** **** 2748" readOnly="readonly" />

            <div className="profile__content--card--input--wrapper">
                <Input value="** / **" readOnly="readonly" />

                <Input value="***" readOnly="readonly" />
            </div>
        </div>
    )
}

export default CardRequisites;