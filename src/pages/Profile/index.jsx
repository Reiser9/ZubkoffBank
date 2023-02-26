import React from 'react';

import './index.css';

import Button from '../../components/Button';
import Input from '../../components/Input';
import ErrorBlock from '../../components/ErrorBlock';
import {Cart, Car, Plus} from '../../components/Icons';

import {copyToClipboard} from '../../utils/copyToClipboard';

const Profile = () => {
    const [cardNumber, setCardNumber] = React.useState("4377 **** **** ****");
    const [cardDate, setCardDate] = React.useState("** / **");
    const [cardCvv, setCardCvv] = React.useState("***");

    return(
        <section className="profile">
            <div className="container">
                <div className="profile__inner">
                    <div className="profile__sidebar">
                        <div className="profile__sidebar--block">
                            <p className="profile__sidebar--title">
                                Счета и карты
                            </p>

                            <div className="profile__sidebar--check profile__sidebar--check--item active">
                                <div className="profile__sidebar--check--icon--inner">
                                    <Cart className="profile__sidebar--check--icon" />
                                </div>

                                <div className="profile__sidebar--check--text--inner">
                                    <p className="profile__sidebar--check--card--name">
                                        Zubkoff Black
                                    </p>

                                    <p className="profile__sidebar--check--card--balance">
                                        13 453,15 ₽
                                    </p>
                                </div>
                            </div>

                            <div className="profile__sidebar--check profile__sidebar--check--item">
                                <div className="profile__sidebar--check--icon--inner">
                                    <Car className="profile__sidebar--check--icon" />
                                </div>

                                <div className="profile__sidebar--check--text--inner">
                                    <p className="profile__sidebar--check--card--name">
                                        Zubkoff Drive
                                    </p>

                                    <p className="profile__sidebar--check--card--balance">
                                        10,51 ₽
                                    </p>
                                </div>
                            </div>

                            <div className="profile__sidebar--check profile__sidebar--check--add">
                                <div className="profile__sidebar--check--icon--inner">
                                    <Plus className="profile__sidebar--check--icon" />
                                </div>

                                <p className="profile__sidebar--check--add--text">
                                    Открыть новый счет
                                </p>
                            </div>
                        </div>

                        <div className="profile__sidebar--block">
                            <p className="profile__sidebar--title">
                                Курсы валют
                            </p>

                            <div className="profile__sidebar--currency--inner">
                                <div className="profile__sidebar--currency--item">
                                    <p className="profile__sidebar--currency--title">
                                        USD
                                    </p>

                                    <p className="profile__sidebar--currency--value">
                                        ₽ 74.76
                                    </p>
                                </div>

                                <div className="profile__sidebar--currency--item">
                                    <p className="profile__sidebar--currency--title">
                                        EUR
                                    </p>

                                    <p className="profile__sidebar--currency--value">
                                        ₽ 80.76
                                    </p>
                                </div>

                                {/* <ErrorBlock text="Сервис временно недоступен" /> */}
                            </div>
                        </div>
                    </div>

                    <div className="profile__content">
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
        </section>
    )
}

export default Profile;