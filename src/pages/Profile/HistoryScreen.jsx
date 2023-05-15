import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './index.css';

import useRequest from '../../hooks/useRequest';
import useTransfer from '../../hooks/useTransfer';

const HistoryScreen = ({cardId}) => {
    const [page, setPage] = React.useState(1);
    const [load, setLoad] = React.useState(false);

    const {error, isLoading, getTransfersHistory} = useTransfer();
    const {cardTypes} = useSelector(state => state.cardTypes);

    const {request} = useRequest();
    const dispatch = useDispatch();

    React.useEffect(() => {
        getTransfersHistory(cardId);
    }, [cardId]);

    return (
        <div className="history__inner">
            <p className="history__title">
                История платежей
            </p>

            <div className="history__content">
                <div className="history__item">
                    <div className="history__item--content">
                        <div className="history__item--first">
                            <div className="history__item--organization--icon--inner">
                                <img src="/assets/img/sbp.svg" alt="sbp" className="history__item--organization--icon" />
                            </div>

                            <div className="history__item--info">
                                <p className="history__item--info--name">
                                    Zubkoff Bank
                                </p>

                                <p className="history__item--info--date">
                                    10 мая 2023
                                </p>
                            </div>
                        </div>

                        <div className="history__item--last">
                            <p className="history__item--info--money red">
                                - 100 ₽
                            </p>

                            <p className="history__item--info--type">
                                Подписка
                            </p>
                        </div>
                    </div>

                    <p className="history__comment">
                        Комментарий
                    </p>
                </div>

                <div className="history__item">
                    <div className="history__item--content">
                        <div className="history__item--first">
                            <div className="history__item--organization--icon--inner">
                                <img src="/assets/img/logo-only.svg" alt="sbp" className="history__item--organization--icon" />
                            </div>

                            <div className="history__item--info">
                                <p className="history__item--info--name">
                                    Zubkoff Bank
                                </p>

                                <p className="history__item--info--date">
                                    10 мая 2023
                                </p>
                            </div>
                        </div>

                        <div className="history__item--last">
                            <p className="history__item--info--money green">
                                + 100 ₽
                            </p>

                            <p className="history__item--info--type">
                                Пополнение
                            </p>
                        </div>
                    </div>

                    <p className="history__comment">
                        Это очень большой комментарий, он занимает очень много места, поэтому у вас сломается верстка хаха
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HistoryScreen;