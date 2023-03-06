import React from 'react';

import './index.css';

import {Cart, Dollar, Car} from '../Icons';
import Button from '../Button';
import CardPoint from './CardPoint';

const forCardInit = {
    "buy": {
        text: "Для покупок",
        icon: <Cart />
    },
    "limit": {
        text: "Для транжир",
        icon: <Dollar />
    },
    "drive": {
        text: "Для автомобилистов",
        icon: <Car />
    }
}

const CardBlock = ({data}) => {
    const {forCard, title, text, card, points} = data;

    return(
        <div className="card__item">
            <div className="card__item--for">
                {forCardInit[forCard].icon}

                <p className="card__item--for--text">
                    {forCardInit[forCard].text}
                </p>
            </div>

            <div className="card__item--content">
                <div className="card__item--box">
                    <p className="card__item--title">
                        {title}
                    </p>

                    <p className="card__item--text">
                        {text}
                    </p>

                    <div className="card__item--points">
                        {points.map((data, id) => <CardPoint key={id} title={data.title} text={data.text} />)}
                    </div>
                </div>

                <img src={`/assets/img/card-${card}.svg`} alt="card" className="card__item--img" />
            </div>

            <div className="card__item--buttons">
                <Button isLink to="/" className="card__item--button--event">
                    Оформить карту
                </Button>
            </div>
        </div>
    )
}

export default CardBlock;