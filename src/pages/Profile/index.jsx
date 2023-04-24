import React from 'react';
import { useSelector } from 'react-redux';

import './index.css';

import Button from '../../components/Button';
import Input from '../../components/Input';
import SidebarItem from '../../components/SidebarItem';
import { Leave, SettingsIcon, User } from '../../components/Icons';
import SidebarTab from '../../components/SidebarTab';
import SidebarButton from '../../components/SidebarTab/SidebarButton';

import useUser from '../../hooks/useUser';
import useCardTypes from '../../hooks/useCardTypes';

import PageSidebarInner from '../../components/PageSidebarInner';
import BackButton from '../../components/Button/BackButton';
import CurrencyBlock from './CurrencyBlock';
import PayMethod from './PayMethod';
import SelectCard from './SelectCard';
import Preloader from '../../components/Preloader';
import { VERIFY_STATUS } from '../../consts/VERIFY_STATUS';
import CardViewBlock from './CardViewBlock';
import EmptyBlock from '../../components/EmptyBlock';
import CurrentCardsBlock from './CurrentCardsBlock';

const Profile = () => {
    const [confirmExitModal, setConfirmExitModal] = React.useState(false);
    const [active, setActive] = React.useState(false);

    const [activeCard, setActiveCard] = React.useState("");
    
    const {getCards} = useUser();
    const {isLoad, getCardTypes} = useCardTypes();
    const {user, cards} = useSelector(state => state.user);

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

                {user.verified !== VERIFY_STATUS.VERIFIED
                    ? <EmptyBlock center title="Для проведения операций требуется пройти верификацию" />
                    : cards.length
                        ? activeCard
                            ? <CardViewBlock cardId={activeCard} />
                            : <EmptyBlock center title="Выберите карту" />
                        : <EmptyBlock center title="Для проведения операций нужно открыть счет" />}

                {/* <PayMethod />

                <SelectCard />

                <div className="transfer__step">
                    <h5 className="transfer__title">Введите данные</h5>

                    <Input className="transfer__input" placeholder="Номер карты" />

                    <Input className="transfer__input" placeholder="Сумма" />

                    <Input className="transfer__input" placeholder="Комментарий к переводу" />

                    <Button className="transfer__btn">Перевести 500 ₽</Button>

                    <p className="transfer__text">Комиссия не взимается банком</p>

                    <p className="transfer__text transfer__text_red">Перевод с комиссией банка: 50 рублей + 2%</p>
                </div> */}
            </div>
        </PageSidebarInner>
    )
}

export default Profile;