import React from 'react';

import './index.css';

import {Percent} from '../Icons';

const CashbackItem = ({title, text, light = false}) => {
    return(
        <div className={`item-cashback${light ? " item-cashback_light" : ""}`}>
            <div className="item-cashback__icon--inner">
                <Percent className="item-cashback__icon item-cashback__icon_small" />
            </div>

            <h4 className="item-cashback__title">{title}</h4>

            <p className="item-cashback__text">{text}</p>
        </div>
    )
}

export default CashbackItem;