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

const CardViewBlock = ({ cardId, setTab }) => {
    const [card, setCard] = React.useState("");
    const [confirmBlockCard, setConfirmBlockCard] = React.useState(false);
    const [submenuActive, setSubmenuActive] = React.useState(false);

    const { cards, userIsLoading } = useSelector(state => state.user);
    const { alertNotify } = useNotify();
    const { blockCard } = useUser();

    const copy = (text) => {
        copyToClipboard(text);
        alertNotify("Успешно", "Текст скопирован", "success");
    }

    const blockCardHandler = () => {
        blockCard(cardId);
    }

    const documentClickHandler = (e) => {
        const targetElement = e.target;

        if (!targetElement.closest('.submenu') && !targetElement.closest('.profile__content--card--options') && !submenuActive) {
            setSubmenuActive(false);
        }
    }

    React.useEffect(() => {
        const currentCard = findElementById(cards, cardId);
        setCard(currentCard);
    }, [cardId, cards]);

    React.useEffect(() => {
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
                        <div className="submenu__item red">
                            <Block className="submenu__icon" />

                            <p className="submenu__text">
                                Заблокировать
                            </p>
                        </div>

                        <div className="submenu__item red">
                            <Delete className="submenu__icon" />

                            <p className="submenu__text">
                                Удалить
                            </p>
                        </div>

                        <div className="submenu__item">
                            <Reload className="submenu__icon" />
                            
                            <p className="submenu__text">
                                Перевыпустить
                            </p>
                        </div>
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

                {card.lock
                    ? <Button className="profile__content--card--button" disabled>
                        Разблокировать
                    </Button>
                    : <Button className="profile__content--card--button" onClick={() => setConfirmBlockCard(true)} disabled={userIsLoading}>
                        Заблокировать
                    </Button>}

                <Button className="profile__content--card--button" disabled={card.lock} onClick={() => setTab("history")}>
                    История
                </Button>
            </div>

            {card.lock
                ? <EmptyBlock title="Данная карта заблокирована" />
                : <>
                    <CardLimitBlock card={card} />
                    <CardRequisitesBlock card={card} />
                </>}

            <Confirm active={confirmBlockCard} setActive={setConfirmBlockCard} text="Вы действительно хотите заблокировать карту?" action={blockCardHandler} />
        </>
    )
}

export default CardViewBlock;