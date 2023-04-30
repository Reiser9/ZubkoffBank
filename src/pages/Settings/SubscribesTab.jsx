import React from 'react';

import './index.css';

import EmptyBlock from '../../components/EmptyBlock';
import SubscribeItem from './SubscribeItem';

const SubscribesTab = () => {
    return (
        <>
            <div className="setting__block">
                <h4 className="setting__title">Активные подписки</h4>

                <EmptyBlock title="У вас нет активных подписок" />
            </div>

            <div className="setting__block">
                <h4 className="setting__title">Список подписок</h4>

                <div className="subscribes__content">
                    <SubscribeItem name="Система быстрых платежей" price="0" icon="/assets/img/sbp.svg" />
                </div>
            </div>
        </>
    )
}

export default SubscribesTab;