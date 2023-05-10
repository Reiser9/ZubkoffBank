import React from 'react';
import { Tooltip } from 'antd';

import './index.css';

import {getPeriod} from '../../utils/getPeriod';
import Button from '../../components/Button';
import {NotifyInfoIcon} from '../../components/Icons';

const SubscribeItem = ({data, active = false, buttonText = "Подключить", action = () => {}, isLoading = false}) => {
    const {name, money, description, period, img} = data;

    return (
        <div className="subscribe__item">
            <div className="subscribe__item--wrap">
                <div className="subscribe__item--logo--inner">
                    <img src={img || '/assets/img/sbp.svg'} alt={name} className="subscribe__item--logo" />
                </div>

                <Tooltip title={description} placement="leftBottom">
                    <NotifyInfoIcon className="subscribe__item--desc" />
                </Tooltip>
            </div>

            <p className="subscribe__item--name">
                {name}
            </p>

            <p className="subscribe__item--price">
                {money} ₽/{getPeriod(period)}
            </p>

            {active
            ? <Button className="subscribe__item--button" disabled>
                Подключено
            </Button>
            : <Button className="subscribe__item--button" onClick={action} disabled={isLoading}>
                {buttonText}
            </Button>}
        </div>
    )
}

export default SubscribeItem;