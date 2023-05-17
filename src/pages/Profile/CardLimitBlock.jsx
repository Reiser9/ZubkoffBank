import React from 'react';

import './index.css';

const CardLimitBlock = ({card, cardType}) => {
    const {limit} = cardType;
    const [progress, setProgress] = React.useState(0);

    return (
        <div className="profile__content--limit--inner">
            <p className="profile__content--limit--title">Лимит карты</p>

            <div className="profile__content--limit--content">
                <div className="profile__content--limit--content--nums">
                    <p className="profile__content--limit--content--num">
                        0 ₽
                    </p>

                    <p className="profile__content--limit--content--num">
                        {limit?.toLocaleString()} ₽
                    </p>
                </div>

                <div className="profile__content--limit--line">
                    <div className={`profile__content--limit--line--progress${progress > 75 ? " orange" : ""}${progress > 90 ? " red" : ""}`} style={{width: `${progress}%`}}></div>
                </div>
            </div>

            <p className="profile__content--limit--value">
                Осталось: <span>50 000 ₽</span>
            </p>
        </div>
    )
}

export default CardLimitBlock;