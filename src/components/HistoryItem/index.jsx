import React from 'react';

import './index.css';

import {getNormalDate} from '../../utils/getNormalDate';
import {getTypeTransfer} from '../../utils/getTypeTransfer';
import {HISTORY_STATUSES} from '../../consts/HISTORY_STATUSES';

const HistoryItem = ({data}) => {
    const {date, message, money, organization, status, type} = data;

    const positiveMoney = () => {
        return type === HISTORY_STATUSES.ATM || type === HISTORY_STATUSES.RECEIVE;
    }

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
                            {getNormalDate(date, "DD.MM.YYYY hh:mm")}
                        </p>
                    </div>
                </div>

                <div className="history__item--last">
                    <p className={`history__item--info--money ${positiveMoney() ? "green" : "red"}`}>
                        {positiveMoney() ? "+" : "-"} {money} ₽
                    </p>

                    <p className="history__item--info--type">
                        {getTypeTransfer(type)}
                    </p>
                </div>
            </div>

            {message && <p className="history__comment">
                {message}
            </p>}
        </div>
    )
}

export default HistoryItem;