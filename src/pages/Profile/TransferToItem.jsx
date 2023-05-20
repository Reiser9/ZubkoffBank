import React from 'react';

import './index.css';
import { BANK_NAMES } from '../../consts/BANK_NAMES';

const TransferToItem = ({data, changeToPay, active = false}) => {
    const {fullName, organization} = data;

    return (
        <div className={`transfer__to--item${active ? " active" : ""}`} onClick={() => changeToPay(data)}>
            <div className="transfer__to--item--content" style={{background: BANK_NAMES[organization].color}}>
                <div className="transfer__to--item--icon--inner">
                    <img src="/assets/img/logo-only.svg" alt="logo" className="transfer__to--item--icon" />
                </div>

                <p className="transfer__to--item--organization">
                    {BANK_NAMES[organization].name || "-"}
                </p>

                <p className="transfer__to--item--name">
                    {fullName || "-"}
                </p>
            </div>
        </div>
    )
}

export default TransferToItem;