import React from 'react';

import './index.css';

import {Cart} from '../../components/Icons';
import Button from '../../components/Button';
import CardPoint from './CardPoint';

const CardBlock = ({data}) => {
    const {name, description, img, limit} = data;

    return(
        <div className="card__item">
            <div className="card__item--for">
                <Cart />

                <p className="card__item--for--text">
                    Для покупок
                </p>
            </div>

            <div className="card__item--content">
                <div className="card__item--box">
                    <p className="card__item--title">
                        Дебетовая карта {process.env.REACT_APP_BANK_NAME} {name}
                    </p>

                    <p className="card__item--text">
                        {description}
                    </p>

                    <div className="card__item--points">
                        <CardPoint title={`${limit.toLocaleString()} ₽`} text="Лимит карты" />
                    </div>
                </div>

                <div className="card__item--img--inner">
                    <img src={img} alt="card" className="card__item--img" />
                </div>
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