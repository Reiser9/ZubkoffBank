import React from 'react';

import './index.css';
import Button from '../../components/Button';

const SubscribeItem = ({price, name, icon, active = false, buttonText = "Подключить"}) => {
    return (
        <div className="subscribe__item">
            <div className="subscribe__item--wrap">
                <div className="subscribe__item--logo--inner">
                    <img src={icon} alt={name} className="subscribe__item--logo" />
                </div>

                <p className="subscribe__item--price">
                    {price} ₽/мес.
                </p>
            </div>

            <p className="subscribe__item--name">
                {name}
            </p>

            {active
            ? <Button className="subscribe__item--button" disabled>
                Подключено
            </Button>
            : <Button className="subscribe__item--button">
                {buttonText}
            </Button>}
        </div>
    )
}

export default SubscribeItem;