import React from 'react';
import { useSelector } from 'react-redux';

import './index.css';

import SidebarItem from '../../components/SidebarItem';
import { Leave, SettingsIcon, User } from '../../components/Icons';
import SidebarTab from '../../components/SidebarTab';
import SidebarButton from '../../components/SidebarTab/SidebarButton';

import useUser from '../../hooks/useUser';
import useCardTypes from '../../hooks/useCardTypes';

import PageSidebarInner from '../../components/PageSidebarInner';
import BackButton from '../../components/Button/BackButton';
import CurrencyBlock from './CurrencyBlock';
import Preloader from '../../components/Preloader';
import { VERIFY_STATUS } from '../../consts/VERIFY_STATUS';
import CardViewBlock from './CardViewBlock';
import EmptyBlock from '../../components/EmptyBlock';
import CurrentCardsBlock from './CurrentCardsBlock';
import PaymentScreen from './PaymentsScreen';

const Profile = () => {
    const [confirmExitModal, setConfirmExitModal] = React.useState(false);
    const [active, setActive] = React.useState(false);

    const [tab, setTab] = React.useState("");
    const [activeCard, setActiveCard] = React.useState("");
    
    const {getCards} = useUser();
    const {isLoad, getCardTypes} = useCardTypes();
    const {user, cards} = useSelector(state => state.user);

    React.useEffect(() => {
        setTab(activeCard);
    }, [activeCard]);

    React.useEffect(() => {
        getCards();
        getCardTypes();
    }, []);

    if(isLoad){
        return <Preloader page />
    }

    return(
        <PageSidebarInner pageTitle="Профиль">
            <div className={`profile__sidebar${active ? " active" : ""}`}>
                <SidebarItem title="Счета и карты">
                    <CurrentCardsBlock
                        exitModal={confirmExitModal}
                        setExitModal={setConfirmExitModal}
                        setActive={setActive}
                        activeCard={activeCard}
                        setActiveCard={setActiveCard}
                    />
                </SidebarItem>

                <SidebarItem title="Курсы валют">
                    <CurrencyBlock />
                </SidebarItem>

                <SidebarItem title="Меню">
                    <div className="sidebar__tabs">
                        <SidebarTab text="Настройки" icon={<SettingsIcon />} isLink to="/settings" />
                        {user?.roles?.includes("admin") && <SidebarTab text="Админка" icon={<User />} isLink to="/admin" />}
                        <SidebarButton text="Выйти" icon={<Leave />} onClick={() => setConfirmExitModal(true)} />
                    </div>
                </SidebarItem>
            </div>

            <div className={`profile__content${active ? " active" : ""}`}>
                <BackButton onClick={() => setActive(false)} />

                {tab !== "payment" && (user.verified !== VERIFY_STATUS.VERIFIED
                    ? <EmptyBlock center title="Для проведения операций требуется пройти верификацию" />
                    : cards.length
                        ? activeCard
                            ? <CardViewBlock cardId={activeCard} setTab={setTab} />
                            : <EmptyBlock center title="Выберите карту" />
                        : <EmptyBlock center title="Для проведения операций нужно открыть счет" />)}

                {tab === "payment" && <PaymentScreen cardId={activeCard} />}
            </div>
        </PageSidebarInner>
    )
}

export default Profile;