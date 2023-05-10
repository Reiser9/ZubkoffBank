import React from 'react';

import './index.css';

const PayMethodItem = ({text, icon, active = false, ...props}) => {
    return (
        <div {...props} className={`payment-method${active ? " active" : ""}`}>
            <div className="payment-method__icon--inner">
                {icon}
            </div>

            <p className="payment-method__text">{text}</p>
        </div>
    )
}

export default PayMethodItem;