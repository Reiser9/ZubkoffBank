import React from 'react';

import './index.css';

import CardBlock from '../../components/CardBlock';
import cardData from '../../cardData.json';

const Cards = () => {
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
                        {cardData.map((data, id) => <CardBlock key={id} data={data} />)}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Cards;