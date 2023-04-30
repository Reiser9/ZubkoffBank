import React from 'react';
import { useSelector } from 'react-redux';

import './index.css';

import { VERIFY_STATUS } from '../../consts/VERIFY_STATUS';

import useAuth from '../../hooks/useAuth';

import { Plus } from '../../components/Icons';
import ErrorBlock from '../../components/ErrorBlock';
import CheckItem from '../../components/CheckItem';
import Confirm from '../../components/Confirm';
import NewCardModal from '../../components/NewCardModal';

const CurrentCardsBlock = ({exitModal, setExitModal, setActive, activeCard, setActiveCard}) => {
    const [newCardModal, setNewCardModal] = React.useState(false);
    const [showMore, setShowMore] = React.useState(false);

    const {logout} = useAuth();
    const {user, cards} = useSelector(state => state.user);

    return (
        <>
            {user.verified !== VERIFY_STATUS.VERIFIED
            ? <div className="profile__sidebar--currency--inner">
                <ErrorBlock text="Необходима верификация" />
            </div>
            : <>
                <div className={`profile__bill--content${showMore ? " active" : ""}`}>
                    {cards.map(data => <CheckItem key={data.id} data={data} active={activeCard} setActive={setActiveCard} setTab={setActive} />)}
                </div>

                {cards.length > 4 && <div className="profile__sidebar--check profile__sidebar--check--add" onClick={() => setShowMore(prev => !prev)}>
                    <p className="profile__sidebar--check--add--text w100 center">
                        Показать {showMore ? "меньше" : "больше"}
                    </p>
                </div>}

                <div className="profile__sidebar--check profile__sidebar--check--add" onClick={() => setNewCardModal(true)}>
                    <div className="profile__sidebar--check--icon--inner">
                        <Plus />
                    </div>

                    <p className="profile__sidebar--check--add--text">
                        Открыть новый счет
                    </p>
                </div>
            </>}

            <NewCardModal active={newCardModal} setActive={setNewCardModal} />
            <Confirm active={exitModal} setActive={setExitModal} text="Вы действительно хотите выйти?" action={logout} />
        </>
    )
}

export default CurrentCardsBlock;