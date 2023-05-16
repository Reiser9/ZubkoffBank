import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './index.css';

import { REQUEST_TYPE } from '../../consts/HTTP';
import useCardTypes from '../../hooks/useCardTypes';
import useUser from '../../hooks/useUser';
import { concatCardTypes } from '../../redux/slices/cardTypes';
import useRequest from '../../hooks/useRequest';

import Modal from '../Modal';
import Preloader from '../Preloader';
import CardShortBlock from '../CardShortBlock';
import EmptyBlock from '../EmptyBlock';
import CardShortBlockSkeleton from '../CardShortBlock/CardShortBlockSkeleton';
import Button from '../Button';

const NewCardModal = ({active, setActive}) => {
    const [page, setPage] = React.useState(1);
    const [load, setLoad] = React.useState(false);

    const {error, isLoad, getCardTypes} = useCardTypes();
    const {getUserFullInfo} = useUser();
    const {cardTypes} = useSelector(state => state.cardTypes);

    const {request} = useRequest();
    const dispatch = useDispatch();

    React.useEffect(() => {
        getUserFullInfo();
        getCardTypes();
    }, []);

    React.useEffect(() => {
        const scrollHandler = (e) => {
            const scrollHeight = document.querySelector(".cards-popup__inner").scrollHeight;
            const scrollTop = e.target.scrollTop;
            const innerHeight = window.innerHeight;
            
            if(scrollHeight - (scrollTop + innerHeight) < 10 && cardTypes.content.length < cardTypes.totalElements){
                setLoad(true);
            }
        }
        
        const popup = document.querySelector(".cards-popup");
        popup.addEventListener("scroll", scrollHandler);

        return () => popup.removeEventListener("scroll", scrollHandler);
    }, [cardTypes]);

    React.useEffect(() => {
        if(load){
            request(REQUEST_TYPE.CARD, `/types?offset=${page}&limit=10`).then(data => {
                dispatch(concatCardTypes(data));
                setPage(prev => prev + 1);
            }).finally(() => {
                setLoad(false);
            });
        }
        else{
            setLoad(false);
        }
    }, [load]);

    return (
        <Modal active={active} setActive={setActive} title="Наши карты">
            <div className="cards-popup__items">
                {isLoad
                    ? <Preloader />
                    : !error
                    ? cardTypes.content?.length ? cardTypes.content.map((data, id) => <CardShortBlock key={id} data={data} setActive={setActive} />)
                    : <EmptyBlock title="Карт нет" />
                    : <EmptyBlock title="Возникла ошибка">
                        <Button small onClick={getCardTypes}>Перезагрузить</Button>
                    </EmptyBlock>}

                {load && [...Array(2)].map((_, id) => <CardShortBlockSkeleton key={id} />)}
            </div>
        </Modal>
    )
}

export default NewCardModal;