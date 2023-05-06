import React from 'react';

import './index.css';

import {getPeriod} from '../../utils/getPeriod';
import Button from '../../components/Button';

const SubscribeItem = ({data, active = false, buttonText = "Подключить"}) => {
    const {name, money, description, period, img} = data;

    return (
        <div className="subscribe__item">
            <div className="subscribe__item--wrap">
                <div className="subscribe__item--logo--inner">
                    <img src={img || '/assets/img/sbp.svg'} alt={name} className="subscribe__item--logo" />
                </div>

                <p className="subscribe__item--price">
                    {money} ₽/{getPeriod(period)}
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