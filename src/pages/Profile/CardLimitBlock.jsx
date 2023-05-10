import React from 'react';

import './index.css';

const CardLimitBlock = ({card}) => {
    const {type, remainsLimit} = card;

    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        if(type && remainsLimit){
            if(remainsLimit >= 0){
                setProgress((type.limit - remainsLimit) / type.limit * 100);
            }
            else{
                setProgress(100);
            }
        }
    }, [remainsLimit, type]);

    return (
        <div className="profile__content--limit--inner">
            <p className="profile__content--limit--title">Лимит карты</p>

            <div className="profile__content--limit--content">
                <div className="profile__content--limit--content--nums">
                    <p className="profile__content--limit--content--num">
                        0 ₽
                    </p>

                    <p className="profile__content--limit--content--num">
                        {type?.limit?.toLocaleString()} ₽
                    </p>
                </div>

                <div className="profile__content--limit--line">
                    <div className={`profile__content--limit--line--progress${progress > 75 ? " orange" : ""}${progress > 90 ? " red" : ""}`} style={{width: `${progress}%`}}></div>
                </div>
            </div>

            <p className="profile__content--limit--value">
                Осталось: <span>{remainsLimit >= 0 ? remainsLimit?.toLocaleString() : "0"} ₽</span>
            </p>
        </div>
    )
}

export default CardLimitBlock;