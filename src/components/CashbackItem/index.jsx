import React from 'react';

import './index.css';

const CashbackItem = ({title, text, icon, light = false}) => {
    return(
        <div className={`item-cashback${light ? " item-cashback_light" : ""}`}>
            <div className="item-cashback__icon--inner">
                {icon}
            </div>

            <h4 className="item-cashback__title">{title}</h4>

            <p className="item-cashback__text">{text}</p>
        </div>
    )
}

export default CashbackItem;