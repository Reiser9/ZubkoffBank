import React from 'react';

import './index.css';

import { Card, Phone, Swap } from '../../components/Icons';

import TransferBlock from './TransferBlock';
import PayMethodItem from './PayMethodItem';

const PayMethod = ({method, setMethod}) => {
    return (
        <TransferBlock title="Перевод">
            <div className="transfer__payment-methods">
                <PayMethodItem text="По номеру карты" icon={<Card />} active={method === "card"} onClick={() => setMethod("card")} />
                <PayMethodItem text="По номеру телефона" icon={<Phone />} active={method === "phone"} onClick={() => setMethod("phone")} />
                {/* <PayMethodItem text="Между своими счетами" icon={<Swap />} active={method === "my"} onClick={() => setMethod("my")} /> */}
            </div>
        </TransferBlock>
    )
}

export default PayMethod;