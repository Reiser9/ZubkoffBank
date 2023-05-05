import React from 'react';
import { useSelector } from 'react-redux';

import './index.css';

import { findElementById } from '../../utils/findElement';
import { copyToClipboard } from '../../utils/copyToClipboard';
import {maskCardNumber} from '../../utils/cardNumber';
import useNotify from '../../hooks/useNotify';
import useUser from '../../hooks/useUser';

import Button from '../../components/Button';
import CardLimitBlock from './CardLimitBlock';
import CardRequisitesBlock from './CardRequisitesBlock';
import EmptyBlock from '../../components/EmptyBlock';

const CardViewBlock = ({cardId, setTab}) => {
    const {cards, userIsLoading} = useSelector(state => state.user);
    const {alertNotify} = useNotify();
    const {blockCard} = useUser();

    const [card, setCard] = React.useState("");

    const copy = (text) => {
        copyToClipboard(text);
        alertNotify("Успешно", "Текст скопирован", "success");
    }

    const blockCardHandler = () => {
        blockCard(cardId);
    }

    React.useEffect(() => {
        const currentCard = findElementById(cards, cardId);
        setCard(currentCard);
    }, [cardId, cards]);

    return (
        <>
            <div className="profile__content--card--inner">
                <img src={card?.type?.img} alt="card" className="profile__content--card--img" />

                <p className="profile__content--card--number" onClick={() => copy(card.cardNum)}>
                    {maskCardNumber(card.cardNum)}
                </p>
            </div>

            <div className="profile__content--card--buttons">
                <Button className="profile__content--card--button" disabled={card.lock} onClick={() => setTab("payment")}>
                    Перевести
                </Button>

                {card.lock
                ? <Button className="profile__content--card--button" disabled>
                    Разблокировать
                </Button>
                : <Button className="profile__content--card--button" onClick={blockCardHandler} disabled={userIsLoading}>
                    Заблокировать
                </Button>}
            </div>

            {card.lock
            ? <EmptyBlock title="Данная карта заблокирована" />
            : <>
                <CardLimitBlock cardType={card.type} />
                <CardRequisitesBlock card={card} />
            </>}
        </>
    )
}

export default CardViewBlock;