import React from 'react';

import './index.css';

import useCardTypes from '../../hooks/useCardTypes';

import CardBlock from './CardBlock';
import CardSkeleton from './CardSkeleton';
import TitleWrapper from '../../components/Wrappers/TitleWrapper';
import { useSelector } from 'react-redux';

const Cards = () => {
    const {error, isLoad} = useCardTypes();
    const {cardTypes} = useSelector(state => state.cardTypes);

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
                            ? cardTypes?.content?.length > 0 ? cardTypes.content.map((data, id) => <CardBlock key={id} data={data} />)
                            : <div>Карт нет</div>
                            : <div>Ошибка</div>}
                        </div>
                    </div>
                </div>
            </section>
        </TitleWrapper>
    )
}

export default Cards;