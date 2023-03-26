import React from 'react';

import './index.css';

import useCardTypes from '../../hooks/useCardTypes';

import CardBlock from './CardBlock';
import CardSkeleton from './CardSkeleton';

const Cards = () => {
    const {error, isLoad, cardTypes} = useCardTypes();

    React.useEffect(() => {
        document.title = `${process.env.REACT_APP_BANK_NAME} Bank - Наши карты`;
        window.scrollTo(0, 0);
    }, []);

    return (
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
                        ? cardTypes.content ? cardTypes.content.map((data, id) => <CardBlock key={id} data={data} />)
                        : <div>Карт нет</div>
                        : <div>Ошибка</div>}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Cards;