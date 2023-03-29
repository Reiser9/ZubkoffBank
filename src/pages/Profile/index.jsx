import React from 'react';

import './index.css';

import Button from '../../components/Button';
import Input from '../../components/Input';
import SidebarItem from '../../components/SidebarItem';
import CheckItem from '../../components/CheckItem';
import { Leave, Plus, SettingsIcon, User } from '../../components/Icons';
import SidebarTab from '../../components/SidebarTab';
import SidebarButton from '../../components/SidebarTab/SidebarButton';

import useAuth from '../../hooks/useAuth';
import useUser from '../../hooks/useUser';

import { copyToClipboard } from '../../utils/copyToClipboard';
import NotContentBlock from '../../components/NotContentBlock';
import PageSidebarInner from '../../components/PageSidebarInner';
import BackButton from '../../components/Button/BackButton';
import CardLimitBlock from './CardLimitBlock';
import NewCardModal from '../../components/NewCardModal';
import CardRequisitesBlock from './CardRequisitesBlock';
import CurrencyBlock from './CurrencyBlock';
import PayMethod from './PayMethod';
import SelectCard from './SelectCard';

const Profile = () => {
    const [modal, setModal] = React.useState(false);

    const {logout} = useAuth();
    const {user} = useUser();

    return(
        <PageSidebarInner pageTitle="Профиль">
            <div className="profile__sidebar">
                <SidebarItem title="Счета и карты">
                    <CheckItem cardName="Zubkoff Black" cardBalance="15 453,32" icon="buy" active />
                    <CheckItem cardName="Zubkoff Platinum" cardBalance="153,32" icon="limit" />
                    <CheckItem cardName="Zubkoff Drive" cardBalance="531 453,32" icon="drive" />

                    <div className="profile__sidebar--check profile__sidebar--check--add" onClick={() => setModal(true)}>
                        <div className="profile__sidebar--check--icon--inner">
                            <Plus />
                        </div>

                        <p className="profile__sidebar--check--add--text">
                            Открыть новый счет
                        </p>
                    </div>
                </SidebarItem>

                <SidebarItem title="Курсы валют">
                    <CurrencyBlock />
                </SidebarItem>

                <SidebarItem title="Меню">
                    <div className="sidebar__tabs">
                        <SidebarTab text="Настройки" icon={<SettingsIcon />} isLink to="/settings" />
                        <SidebarButton text="Выйти" icon={<Leave />} onClick={logout} />
                        {user?.roles?.includes("admin") && <SidebarTab text="Админка" icon={<User />} isLink to="/admin" />}
                    </div>
                </SidebarItem>
            </div>

            {/* <div className="profile__content center">
                <NotContentBlock text="Для проведения операций требуется верификация" icon="not-verified">
                    <Button className="unavailable__button" isLink to="/settings">Пройти</Button>
                </NotContentBlock>

                <NotContentBlock text="Для проведения операций нужно открыть счет" icon="open-card">
                    <Button className="unavailable__button" onClick={() => setModal(true)}>Открыть</Button>
                </NotContentBlock>
                                
                <div className="profile__content--card--inner">
                    <img src="/assets/img/card-black-empty.svg" alt="card" className="profile__content--card--img" />

                    <p className="profile__content--card--number" onClick={() => copyToClipboard("4377 7462 7348 2748")}>
                        **** **** **** 2748
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
            </div> */}

            <div className="profile__content">
                <BackButton desktop />

                <PayMethod />

                <SelectCard />

                {/* При реализации переводов сделать компонентом блок перевода */}
                <div className="transfer__step">
                    <h5 className="transfer__title">Введите данные</h5>

                    <Input className="transfer__input" placeholder="Номер карты" />

                    <Input className="transfer__input" placeholder="Сумма" />

                    <Input className="transfer__input" placeholder="Комментарий к переводу" />

                    <Button className="transfer__btn">Перевести 500 ₽</Button>

                    <p className="transfer__text">Комиссия не взимается банком</p>

                    <p className="transfer__text transfer__text_red">Перевод с комиссией банка: 50 рублей + 2%</p>
                </div>
            </div>

            {modal && <NewCardModal active={modal} setActive={setModal} />}
        </PageSidebarInner>
    )
}

export default Profile;