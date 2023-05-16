import React from 'react';
import Skeleton from 'react-loading-skeleton';

import './index.css';

const HistorySkeleton = () => {
    return (
        <div className="history__item">
            <div className="history__item--content">
                <div className="history__item--first">
                    <Skeleton borderRadius={50} containerClassName="history__item--organization--icon--skeleton" className="skeleton__content" />

                    <div className="history__item--info">
                        <Skeleton containerClassName="history__item--info--name--skeleton" className="skeleton__content" />

                        <Skeleton containerClassName="history__item--info--date--skeleton" className="skeleton__content" />
                    </div>
                </div>

                <div className="history__item--last">
                    <Skeleton containerClassName="history__item--info--money--skeleton" className="skeleton__content" />

                    <Skeleton containerClassName="history__item--info--type--skeleton" className="skeleton__content" />
                </div>
            </div>
        </div>
    )
}

export default HistorySkeleton;