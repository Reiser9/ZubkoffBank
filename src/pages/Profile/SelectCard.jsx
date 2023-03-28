import React from 'react';
import CardItem from './CardItem';

import './index.css';

import TransferBlock from './TransferBlock';

const SelectCard = () => {
    return (
        <TransferBlock title="Выберите счет оплаты">
            <div className="transfer__bil-payments">
                <CardItem cardName="Zubkoff Black" balance="13 453,15" cardNumber="**** 6774" active />
                <CardItem cardName="Zubkoff Junior" balance="1 034,15" cardNumber="**** 6197" />
                <CardItem cardName="Zubkoff Platinum" balance="231,15" cardNumber="**** 1245" />
                <CardItem cardName="Zubkoff Drive" balance="0,15" cardNumber="**** 2441" />
            </div>
        </TransferBlock>
    )
}

export default SelectCard;