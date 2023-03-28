import React from 'react';

import './index.css';

import { Card, Phone, SBP } from '../../components/Icons';

import TransferBlock from './TransferBlock';
import PayMethodItem from './PayMethodItem';

const PayMethod = () => {
    return (
        <TransferBlock title="Выберите способ оплаты">
            <div className="transfer__payment-methods">
                <PayMethodItem text="По номеру карты" icon={<Card />} active />
                <PayMethodItem text="По номеру телефона" icon={<Phone />} />
                <PayMethodItem text="По системе быстрых платежей" icon={<SBP className="payment-method__icon_sbp" />} />
            </div>
        </TransferBlock>
    )
}

export default PayMethod;