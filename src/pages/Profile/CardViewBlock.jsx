import React from 'react';
import { useSelector } from 'react-redux';

import './index.css';

import { copyToClipboard } from '../../utils/copyToClipboard';
import {maskCardNumber} from '../../utils/cardNumber';
import useNotify from '../../hooks/useNotify';

import Button from '../../components/Button';
import CardLimitBlock from './CardLimitBlock';
import CardRequisitesBlock from './CardRequisitesBlock';

const CardViewBlock = ({cardId}) => {
    const {cards} = useSelector(state => state.user);
    const {cardTypes} = useSelector(state => state.cardTypes);
    const {alertNotify} = useNotify();

    const [card, setCard] = React.useState("");
    const [img, setImg] = React.useState("");

    const copy = (text) => {
        copyToClipboard(text);
        alertNotify("Успешно", "Текст скопирован", "success");
    }

    React.useEffect(() => {
        const indexCard = cards?.findIndex(item => item.id === cardId);
        setCard(cards[indexCard]);

        const indexCardImg = cardTypes?.content?.findIndex(item => item.id === cards[indexCard].typeId);
        setImg(cardTypes?.content[indexCardImg].img);
    }, [cardId]);

    return (
        <>
            <div className="profile__content--card--inner">
                <img src={img} alt="card" className="profile__content--card--img" />

                <p className="profile__content--card--number" onClick={() => copy(card.cardNum)}>
                    {maskCardNumber(card.cardNum)}
                </p>
            </div>

            <div className="profile__content--card--buttons">
                <Button className="profile__content--card--button">
                    Перевести
                </Button>

                <Button className="profile__content--card--button">
                    Заблокировать
                </Button>
            </div>

            <CardLimitBlock />

            <CardRequisitesBlock />
        </>
    )
}

export default CardViewBlock;