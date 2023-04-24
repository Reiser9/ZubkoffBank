import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './index.css';

import useCardTypes from '../../hooks/useCardTypes';

import CardBlock from './CardBlock';
import CardSkeleton from './CardSkeleton';
import TitleWrapper from '../../components/Wrappers/TitleWrapper';
import EmptyBlock from '../../components/EmptyBlock';

import useRequest, { REQUEST_TYPE } from '../../hooks/useRequest';
import { concatCardTypes } from '../../redux/slices/cardTypes';

const Cards = () => {
    const [page, setPage] = React.useState(0);
    const [load, setLoad] = React.useState(true);

    const {error, isLoad, getCardTypes} = useCardTypes();
    const {cardTypes} = useSelector(state => state.cardTypes);

    const {request} = useRequest();
    const dispatch = useDispatch();

    React.useEffect(() => {
        getCardTypes();
    }, []);

    React.useEffect(() => {
        window.addEventListener("scroll", scrollHandler);

        return () => window.removeEventListener("scroll", scrollHandler);
    }, []);

    React.useEffect(() => {
        if(load){
            request(REQUEST_TYPE.CARD, `/types?limit=10&offset=${page}`).then(data => {
                dispatch(concatCardTypes(data));
                setPage(prev => prev + 1);
            }).finally(() => {
                setLoad(false);
            });
        }
    }, [load]);

    const scrollHandler = (e) => {
        const scrollHeight = e.target.documentElement.scrollHeight;
        const scrollTop = e.target.documentElement.scrollTop;
        const innerHeight = window.innerHeight;
        const footer = document.querySelector(".footer");
        const footerHeight = footer.scrollHeight;
        
        if(scrollHeight - (scrollTop + innerHeight + footerHeight) < 10 && cardTypes?.content?.length < cardTypes.totalElements){
            setLoad(true);
        }
    }

    return (
        <TitleWrapper pageTitle="Наши карты">
            <section className="card">
                <div className="container">
                    <div className="card__inner">
                        <h1 className="card__title">
                            Наши карты
                        </h1>

                        <div className="card__content">
                            {isLoad
                            ? [...Array(3)].map((_, id) => <CardSkeleton key={id} />)
                            : !error
                            ? cardTypes?.content?.length ? cardTypes.content.map((data, id) => <CardBlock key={id} data={data} />)
                            : <EmptyBlock title="Карт нет" fill />
                            : <EmptyBlock title="Возникла ошибка" fill />}

                            {load && [...Array(3)].map((_, id) => <CardSkeleton key={id} />)}
                        </div>
                    </div>
                </div>
            </section>
        </TitleWrapper>
    )
}

export default Cards;