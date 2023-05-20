import React from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import Skeleton from 'react-loading-skeleton';

import "swiper/css";
import "swiper/css/free-mode";
import './index.css';

import Button from '../../components/Button';
import Input from '../../components/Input';
import TransferBlock from './TransferBlock';
import CardItem from './CardItem';
import useTransfer from '../../hooks/useTransfer';
import useDelay from '../../hooks/useDelay';
import PayMethod from './PayMethod';
import TransferToItem from './TransferToItem';
import {INPUT_MASK_TYPE} from '../../consts/INPUT_MASK_TYPE';
import {unmaskPhone} from '../../utils/maskPhone';

const PaymentScreen = ({cardId, setTab}) => {
    const [stage, setStage] = React.useState(1);

    const [userCards, setUserCards] = React.useState([]);
    const [payCard, setPayCard] = React.useState("");
    const [toPayInfo, setToPayInfo] = React.useState("");

    const [method, setMethod] = React.useState("");
    const [cardNum, setCardNum] = React.useState("");
    const [phoneNum, setPhoneNum] = React.useState("");

    const [transferCode, setTransferCode] = React.useState(false);
    const [confirmCode, setConfirmCode] = React.useState("");

    const [summ, setSum] = React.useState("");
    const [summWithComission, setSumWithComission] = React.useState("");
    const [message, setMessage] = React.useState("");

    const {cards} = useSelector(state => state.user);
    const {infoTransfer, comission} = useSelector(state => state.transfers);
    const {isLoading, sendTransfer, getInfoBanks, getInfoByCard, getConfirmTransferCode, checkComission} = useTransfer();

    const send = () => {
        if(summ >= 100000 && !transferCode){
            setTransferCode(true);

            return getConfirmTransferCode();
        }

        let transferProp = {
            money: summ,
            cardNum: payCard,
            destOrganization: toPayInfo.organization,
            destCode: toPayInfo.code,
            message
        }

        if(phoneNum){
            transferProp = {
                ...transferProp,
                destPhoneNum: toPayInfo.phoneNum
            }
        }
        else{
            transferProp = {
                ...transferProp,
                destCardNum: cardNum.split(/\s+/).join('')
            }
        }

        if(transferCode){
            transferProp = {
                ...transferProp,
                confirmCode
            }
        }

        sendTransfer(transferProp,
        () => {
            setStage(1);
            setMethod("");
            setSum("");
            setMessage("");
            setTab("card");
        });
    }

    const getInfo = async () => {
        if(method === "phone"){
            getInfoBanks(unmaskPhone(phoneNum), () => setStage(3));
        }
        else{
            getInfoByCard(cardNum.split(/\s+/).join(''), () => setStage(3));
        }
    }

    const transfersStagePrev = () => {
        setStage(prev => prev - 1);

        if(stage === 2){
            setMethod("");
        }
    }

    useDelay(() => {
        if(summ && payCard && toPayInfo){
            let params = {
                money: summ,
                cardNum: payCard,
                code: toPayInfo.code
            }
    
            checkComission(params);
        }
    }, [summ, payCard, toPayInfo], 400);

    React.useEffect(() => {
        setSumWithComission(comission * summ);
    }, [comission]);

    React.useEffect(() => {
        if(summ > 1000000){
            setSum(1000000);
        }
        else if(summ <= 0 && summ != ""){
            setSum(1);
        }

        setTransferCode(false);
    }, [summ]);

    React.useEffect(() => {
        setCardNum("");
        setPhoneNum("");
        
        if(method){
            setStage(2);
        }
        else{
            setStage(1);
        }
    }, [method]);

    React.useEffect(() => {
        const cardsWithoutLock = cards.filter(card => !card.lock);
        const itemToMove = cardsWithoutLock.find(item => item.id === cardId);
        const otherItems = cardsWithoutLock.filter(item => item.id !== cardId);

        setPayCard(itemToMove.cardNum);
        setUserCards([itemToMove].concat(otherItems));
    }, [cardId]);

    return (
        <>
            {stage === 1 && <PayMethod method={method} setMethod={setMethod} />}

            {stage === 2 && <div className="transfer__step">
                <h5 className="transfer__title">Введите реквизиты</h5>
                
                {method === "phone"
                ? <Input mask={INPUT_MASK_TYPE.PHONE} className="transfer__input" placeholder="Номер телефона" value={phoneNum} setValue={setPhoneNum} />
                : <Input mask={INPUT_MASK_TYPE.CARD} className="transfer__input" placeholder="Номер карты" value={cardNum} setValue={setCardNum} />}

                <Button onClick={getInfo} className="transfer__info--button" disabled={isLoading || (phoneNum.length !== 17 && cardNum.length !== 19)}>
                    Далее
                </Button>
            </div>}

            {stage === 3 && <>
                <TransferBlock title="Счет снятия">
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
                            <CardItem data={data} changeCardPay={setPayCard} active={data.cardNum === payCard} />
                        </SwiperSlide>)}
                    </Swiper>
                </TransferBlock>

                <div className="transfer__to--content">
                    <div className="transfer__to--wrapper">{infoTransfer.map((data, id) => <TransferToItem key={id} data={data} active={data.code === toPayInfo.code} changeToPay={setToPayInfo} />)}</div>
                </div>

                <div className="transfer__step">
                    <h5 className="transfer__title">Данные перевода</h5>

                    <Input className="transfer__input" placeholder="Сумма" value={summ} setValue={setSum} type="number" title="Не более 1 000 000₽" />

                    <Input className="transfer__input" placeholder="Комментарий к переводу" value={message} setValue={setMessage} title="Максимум 100 символов" />

                    {transferCode && <Input mask={INPUT_MASK_TYPE.CONFIRM_CODE} className="transfer__input" placeholder="Код" value={confirmCode} setValue={setConfirmCode} title="Код подтверждения" />}

                    {!summ || !toPayInfo
                    ? <Button className="transfer__btn" disabled>Перевести</Button>
                    : <Button className="transfer__btn" disabled={isLoading || (transferCode && confirmCode.length !== 6)} onClick={send}>Перевести {summWithComission} ₽</Button>}

                    {summ > 0 && (isLoading
                    ? <Skeleton containerClassName="transfer__text--skeleton" className="skeleton__content" />
                    : comission > 1
                        ? <p className="transfer__text transfer__text_red">Перевод с комиссией банка: {comission * 100 - 100}%</p>
                        : <p className="transfer__text">Комиссия не взимается банком</p>)}
                </div>
            </>}

            <div className="transfer__buttons">
                <Button className="transfer__button" disabled={stage <= 1} onClick={transfersStagePrev}>Назад</Button>
            </div>
        </>
    )
}

export default PaymentScreen;