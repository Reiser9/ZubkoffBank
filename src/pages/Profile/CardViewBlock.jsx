import React from 'react';
import { useSelector } from 'react-redux';

import './index.css';
import '../../components/Headers/index.css';

import { findElementById } from '../../utils/findElement';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { maskCardNumber } from '../../utils/cardNumber';
import useNotify from '../../hooks/useNotify';
import useUser from '../../hooks/useUser';

import Button from '../../components/Button';
import CardLimitBlock from './CardLimitBlock';
import CardRequisitesBlock from './CardRequisitesBlock';
import EmptyBlock from '../../components/EmptyBlock';
import Confirm from '../../components/Confirm';
import { Block, Delete, Dots, Reload } from '../../components/Icons';

const CardViewBlock = ({ cardId, setActiveCard, setTab }) => {
    const [card, setCard] = React.useState("");
    const [confirmBlockCard, setConfirmBlockCard] = React.useState(false);
    const [submenuActive, setSubmenuActive] = React.useState(false);

    const { cards, userIsLoading } = useSelector(state => state.user);
    const { alertNotify } = useNotify();
    const { blockCard, recreateCard, deleteCard } = useUser();

    const copy = (text) => {
        copyToClipboard(text);
        alertNotify("Успешно", "Текст скопирован", "success");
    }

    const removeCardHandler = () => {
        deleteCard(cardId);
        setActiveCard("");
    }

    const recreateCardHandler = () => {
        recreateCard(cardId);
    }

    React.useEffect(() => {
        const currentCard = findElementById(cards, cardId);
        setCard(currentCard);
    }, [cardId, cards]);

    React.useEffect(() => {
        const documentClickHandler = (e) => {
            const targetElement = e.target;
    
            if (!targetElement.closest('.submenu') && !targetElement.closest('.profile__content--card--options') && !submenuActive) {
                setSubmenuActive(false);
            }
        }

        document.addEventListener("click", documentClickHandler);

        return () => document.removeEventListener("click", documentClickHandler);
    }, []);

    return (
        <>
            <div className="profile__content--inner">
                <div className="profile__content--card--options">
                    <div className="profile__content--card--options--btn" onClick={() => setSubmenuActive(prev => !prev)}>
                        <Dots className="profile__content--card--options--icon" />
                    </div>
                    <div className={`submenu submenu_profile${submenuActive ? " active" : ""}`}>
                        {!card.lock && <div className="submenu__item red" onClick={() => setConfirmBlockCard(true)} disabled={userIsLoading}>
                            <Block className="submenu__icon" />

                            <p className="submenu__text">
                                Заблокировать
                            </p>
                        </div>}

                        {card.lock && <>
                            <div className="submenu__item red" onClick={removeCardHandler} disabled={userIsLoading}>
                                <Delete className="submenu__icon" />

                                <p className="submenu__text">
                                    Удалить
                                </p>
                            </div>

                            <div className="submenu__item" onClick={recreateCardHandler} disabled={userIsLoading}>
                                <Reload className="submenu__icon" />
                                
                                <p className="submenu__text">
                                    Перевыпустить
                                </p>
                            </div>
                        </>}
                    </div>
                </div>
                <div className="profile__content--card--inner">
                    <img src={card?.type?.img} alt="card" className="profile__content--card--img" />
                    <p className="profile__content--card--number" onClick={() => copy(card.cardNum)}>
                        {maskCardNumber(card.cardNum)}
                    </p>
                </div>
            </div>

            <div className="profile__content--card--buttons">
                <Button className="profile__content--card--button" disabled={card.lock} onClick={() => setTab("payment")}>
                    Перевести
                </Button>

                <Button className="profile__content--card--button" disabled={card.lock} onClick={() => setTab("history")}>
                    История платежей
                </Button>
            </div>

            {card.lock
                ? <EmptyBlock title="Данная карта заблокирована" />
                : <>
                    <CardLimitBlock card={card} />
                    <CardRequisitesBlock card={card} />
                </>}

            <Confirm active={confirmBlockCard} setActive={setConfirmBlockCard} text="Вы действительно хотите заблокировать карту?" action={() => blockCard(cardId)} />
        </>
    )
}

export default CardViewBlock;