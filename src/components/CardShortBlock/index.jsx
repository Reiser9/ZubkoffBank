import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './index.css';

import { transliterate } from '../../utils/transliterate';
import useUser from '../../hooks/useUser';

import Button from '../Button';

const CardShortBlock = ({data, setActive}) => {
    const {id, img} = data;

    const {user} = useSelector(state => state.user);
    const {createCard} = useUser();

    const createCardHandler = async () => {
        const firstName = transliterate(user.firstName, true);
        const secondName = transliterate(user.secondName, true);

        createCard(id, firstName, secondName);
        setActive(false);
    }

    return(
        <div className="cards-popup__item">
            <div className="cards-popup__card-icon--inner">
                <img src={img} alt="card" className="cards-popup__card-icon"/>
            </div>

            <div className="cards-popup__btns">
                <Button className="cards-popup__button" onClick={createCardHandler}>Оформить карту</Button>

                <Link to="/cards" className="cards-popup__link">Подробнее</Link>
            </div>
        </div>
    )
}

export default CardShortBlock;