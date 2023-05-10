import React from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import './index.css';

import Button from '../../components/Button';
import Input from '../../components/Input';
import TransferBlock from './TransferBlock';
import CardItem from './CardItem';

const PaymentScreen = ({cardId}) => {
    const [userCards, setUserCards] = React.useState([]);
    const [payCard, setPayCard] = React.useState(cardId);

    const {cards} = useSelector(state => state.user);

    React.useEffect(() => {
        const cardsWithoutLock = cards.filter(card => !card.lock);
        const itemToMove = cardsWithoutLock.find(item => item.id === cardId);
        const otherItems = cardsWithoutLock.filter(item => item.id !== cardId);

        setUserCards([itemToMove].concat(otherItems));
    }, [cardId]);

    return (
        <>
            <TransferBlock title="Выберите счет оплаты">
                <Swiper
                    className="transfer__bil-payments"
                    spaceBetween={10}
                    freeMode={true}
                    modules={[FreeMode]}
                    breakpoints={{
                        0: {
                            slidesPerView: 1.5
                        },
                        350: {
                            slidesPerView: 1.75
                        },
                        430: {
                            slidesPerView: 2.25
                        },
                        610: {
                            slidesPerView: 2.75
                        },
                        769: {
                            slidesPerView: 1.75
                        },
                        820: {
                            slidesPerView: 2.25
                        },
                        930: {
                            slidesPerView: 2.75
                        },
                        1100: {
                            slidesPerView: 3.5
                        },
                    }}
                >
                    {userCards.map(data => <SwiperSlide key={data.id}>
                        <CardItem data={data} changeCardPay={setPayCard} active={data.id === payCard} />
                    </SwiperSlide>)}
                </Swiper>
            </TransferBlock>

            <div className="transfer__step">
                <h5 className="transfer__title">Введите реквизиты</h5>

                <Input className="transfer__input" placeholder="Номер карты" />

                <h5 className="transfer__title">Данные перевода</h5>

                <Input className="transfer__input" placeholder="Сумма" />

                <Input className="transfer__input" placeholder="Комментарий к переводу" />

                <Button className="transfer__btn">Перевести 500 ₽</Button>

                <p className="transfer__text">Комиссия не взимается банком</p>

                <p className="transfer__text transfer__text_red">Перевод с комиссией банка: 2%</p>
            </div>
        </>
    )
}

export default PaymentScreen;