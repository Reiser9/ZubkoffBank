import React from 'react';

import './index.css';

import { Card, Phone } from '../../components/Icons';

import TransferBlock from './TransferBlock';
import PayMethodItem from './PayMethodItem';

const PayMethod = ({method, setMethod}) => {
    return (
        <TransferBlock title="Выберите способ оплаты">
            <div className="transfer__payment-methods">
                <PayMethodItem text="По номеру карты" icon={<Card />} active={method === "card"} onClick={() => setMethod("card")} />
                <PayMethodItem text="По номеру телефона" icon={<Phone />} active={method === "phone"} onClick={() => setMethod("phone")} />
            </div>
        </TransferBlock>
    )
}

export default PayMethod;