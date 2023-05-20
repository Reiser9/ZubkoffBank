import React from 'react';

import './index.css';

import {getOrganizationInfo} from '../../utils/getOrganizationInfo';

const TransferToItem = ({data, changeToPay, active = false}) => {
    const {fullName, organization} = data;

    return (
        <div className={`transfer__to--item${active ? " active" : ""}`} onClick={() => changeToPay(data)}>
            <div className="transfer__to--item--content" style={{background: getOrganizationInfo(organization)?.color}}>
                <div className="transfer__to--item--icon--inner">
                    <img src="/assets/img/logo-only.svg" alt="logo" className="transfer__to--item--icon" />
                </div>

                <p className="transfer__to--item--organization">
                    {getOrganizationInfo(organization)?.name || "-"}
                </p>

                <p className="transfer__to--item--name">
                    {fullName || "-"}
                </p>
            </div>
        </div>
    )
}

export default TransferToItem;