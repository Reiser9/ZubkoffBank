import React from 'react';

import './index.css';

const HistoryItem = ({data}) => {
    const {money, type, organization, date, comment} = data;

    return (
        <div className="history__item">
            <div className="history__item--content">
                <div className="history__item--first">
                    <div className="history__item--organization--icon--inner">
                        <img src="/assets/img/logo-only.svg" alt="sbp" className="history__item--organization--icon" />
                    </div>

                    <div className="history__item--info">
                        <p className="history__item--info--name">
                            {organization}
                        </p>

                        <p className="history__item--info--date">
                            {date}
                        </p>
                    </div>
                </div>

                <div className="history__item--last">
                    <p className="history__item--info--money green">
                        + {money} ₽
                    </p>

                    <p className="history__item--info--type">
                        Пополнение
                    </p>
                </div>
            </div>

            {comment && <p className="history__comment">
                {comment}
            </p>}
        </div>
    )
}

export default HistoryItem;