import React from 'react';

import './index.css';

import useCardTypes from '../../hooks/useCardTypes';

import CardBlock from '../../components/CardBlock';
import CardsSkeleton from './CardsSkeleton';

const Cards = () => {
    const {error, isLoad, cardTypes} = useCardTypes();

    React.useEffect(() => {
        document.title = `${process.env.REACT_APP_BANK_NAME} Bank - Наши карты`;
        window.scrollTo(0, 0);
    }, []);

    if(isLoad){
        return <CardsSkeleton />
    }

    return (
        <section className="card">
            <div className="container">
                <div className="card__inner">
                    <h1 className="card__title">
                        Наши карты
                    </h1>

                    <div className="card__content">
                        {error
                        ? <div>Ошибка</div>
                        : cardTypes?.content?.map((data, id) => <CardBlock key={id} data={data} />)}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Cards;