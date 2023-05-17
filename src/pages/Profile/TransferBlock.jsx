import React from 'react';

import './index.css';

const TransferBlock = ({title, children}) => {
    return (
        <div className="transfer__step">
            <h5 className="transfer__title">{title}</h5>

            {children}
        </div>
    )
}

export default TransferBlock;