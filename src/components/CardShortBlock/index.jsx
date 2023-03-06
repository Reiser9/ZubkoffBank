import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';

import Button from '../Button';

const CardShortBlock = ({icon = "black"}) => {
    return(
        <div className="cards-popup__item">
            <div className="cards-popup__card-icon--inner">
                <img src={`assets/img/card-${icon}.svg`} alt="card" className="cards-popup__card-icon"/>
            </div>

            <div className="cards-popup__btns">
                <Button className="cards-popup__button">Оформить карту</Button>

                <Link to="/cards" className="cards-popup__link">Подробнее</Link>
            </div>
        </div>
    )
}

export default CardShortBlock;