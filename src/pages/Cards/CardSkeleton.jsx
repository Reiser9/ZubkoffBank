import React from 'react';
import Skeleton from 'react-loading-skeleton';

import './index.css';

const CardsSkeleton = () => {
    return (
        <div className="card__item">
            <Skeleton containerClassName="card__for--skeleton" className="skeleton__content" />

            <div className="card__item--content">
                <div className="card__item--box">
                    <Skeleton containerClassName="card__item--title--skeleton" className="skeleton__content" />

                    <Skeleton containerClassName="card__item--text card__item--text--skeleton" className="skeleton__content" />

                    <div className="card__item--points">
                        <Skeleton containerClassName="card__item--point card__item--point--skeleton" className="skeleton__content" />
                    </div>
                </div>

                <Skeleton containerClassName="card__img--skeleton" className="skeleton__content" />
            </div>

            <Skeleton containerClassName="card__button--skeleton" className="skeleton__content" />
        </div>
    )
}

export default CardsSkeleton;