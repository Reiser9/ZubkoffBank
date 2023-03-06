import React from 'react';

import './index.css';

import Button from '../../components/Button';
import Input from '../../components/Input';
import ErrorBlock from '../../components/ErrorBlock';
import SidebarItem from '../../components/SidebarItem';
import CheckItem from '../../components/CheckItem';
import Preloader from '../../components/Preloader';
import {Plus, SettingsIcon} from '../../components/Icons';
import useCurrency from '../../hooks/useCurrency';
import Modal from '../../components/Modal';
import CardShortBlock from '../../components/CardShortBlock';
import SidebarTab from '../../components/SidebarTab';

import {copyToClipboard} from '../../utils/copyToClipboard';
import NotContentBlock from '../../components/NotContentBlock';

const Profile = () => {
    const [cardNumber, setCardNumber] = React.useState("4377 **** **** ****");
    const [cardDate, setCardDate] = React.useState("** / **");
    const [cardCvv, setCardCvv] = React.useState("***");

    const [modal, setModal] = React.useState(false);

    const {isLoadCurrency, errorCurrency, currency} = useCurrency();

    React.useEffect(() => {
        document.title = `${process.env.REACT_APP_BANK_NAME} Bank - Профиль`;
        window.scrollTo(0, 0);
    }, []);

    return(
        <section className="profile">
            <div className="container">
                <div className="profile__inner">
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
                            <div className="profile__sidebar--currency--inner">
                                {isLoadCurrency ? <Preloader small /> : errorCurrency ? <ErrorBlock text="Сервис временно недоступен" /> : <>
                                    <div className="profile__sidebar--currency--item">
                                        <p className="profile__sidebar--currency--title">
                                            USD
                                        </p>

                                        <p className="profile__sidebar--currency--value">
                                            ₽ {currency.usd}
                                        </p>
                                    </div>

                                    <div className="profile__sidebar--currency--item">
                                        <p className="profile__sidebar--currency--title">
                                            EUR
                                        </p>

                                        <p className="profile__sidebar--currency--value">
                                            ₽ {currency.eur}
                                        </p>
                                    </div>
                                </>}
                            </div>
                        </SidebarItem>

                        <SidebarItem title="Настройки">
                            <div className="sidebar__tabs">
                                <SidebarTab text="Настройки" icon={<SettingsIcon />} isLink to="/settings" />
                            </div>
                        </SidebarItem>
                    </div>

                    <div className="profile__content">
                        {/* <NotContentBlock text="Для проведения операций требуется верификация" icon="not-verified">
                            <Button className="unavailable__button" isLink to="/settings">Пройти</Button>
                        </NotContentBlock>

                        <NotContentBlock text="Для проведения операций нужно открыть счет" icon="open-card">
                            <Button className="unavailable__button" onClick={() => setModal(true)}>Открыть</Button>
                        </NotContentBlock> */}
                        
                        <div className="profile__content--card--inner">
                            <img src="/assets/img/card-black-empty.svg" alt="card" className="profile__content--card--img" />

                            <p className="profile__content--card--number" onClick={() => copyToClipboard("4377 7462 7348 2748")}>
                                4377 **** **** ****
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

                        <div className="profile__content--limit--inner">
                            <p className="profile__content--limit--title">
                                Лимит карты
                            </p>

                            <div className="profile__content--limit--content">
                                <div className="profile__content--limit--content--nums">
                                    <p className="profile__content--limit--content--num">
                                        0 ₽
                                    </p>

                                    <p className="profile__content--limit--content--num">
                                        100 000 ₽
                                    </p>
                                </div>

                                <div className="profile__content--limit--line">
                                    <div className="profile__content--limit--line--progress"></div>
                                </div>
                            </div>

                            <p className="profile__content--limit--value">
                                Осталось: <span>50 000 ₽</span>
                            </p>
                        </div>

                        <div className="profile__content--card--data">
                            <div className="profile__content--card--data--title--inner">
                                <p className="profile__content--card--data--title">
                                    Реквизиты карты
                                </p>

                                <p className="profile__content--card--data--show">
                                    Показать
                                </p>
                            </div>

                            <Input value={cardNumber} setValue={setCardNumber} readOnly="readonly" />

                            <div className="profile__content--card--input--wrapper">
                                <Input value={cardDate} setValue={setCardDate} readOnly="readonly" />

                                <Input value={cardCvv} setValue={setCardCvv} readOnly="readonly" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal active={modal} setActive={setModal}>
                <div className="cards-popup__items">
                    <CardShortBlock icon="black" />
                    <CardShortBlock icon="junior" />
                    <CardShortBlock icon="platinum" />
                    <CardShortBlock icon="drive" />
                </div>
            </Modal>
        </section>
    )
}

export default Profile;