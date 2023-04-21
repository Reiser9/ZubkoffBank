import React from 'react';

import './index.css';

const PagginationItem = ({number, active = false, ...props}) => {
    return (
        <div className={`number__btn${active ? " active" : ""}`} {...props}>{number}</div>
    )
}

export default PagginationItem;