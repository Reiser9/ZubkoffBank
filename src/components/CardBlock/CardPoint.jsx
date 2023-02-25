import React from 'react';

const CardPoint = ({title, text}) => {
    return(
        <div className="card__item--point">
            <p className="card__item--point--title">
                {title}
            </p>

            <p className="card__item--point--text">
                {text}
            </p>
        </div>
    )
}

export default CardPoint;