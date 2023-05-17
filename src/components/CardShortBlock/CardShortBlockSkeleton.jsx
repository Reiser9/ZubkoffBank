import React from 'react';
import Skeleton from 'react-loading-skeleton';

import './index.css';

const CardShortBlockSkeleton = () => {
    return (
        <div className="cards-popup__item">
            <Skeleton containerClassName="cards-popup__card-icon--skeleton" className="skeleton__content" />

            <div className="cards-popup__btns">
                <Skeleton containerClassName="cards-popup__button--skeleton" className="skeleton__content" borderRadius={50} />

                <Skeleton containerClassName="cards-popup__link--skeleton" className="skeleton__content" />
            </div>
        </div>
    )
}

export default CardShortBlockSkeleton;