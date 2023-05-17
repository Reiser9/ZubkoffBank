import React from 'react';

import './index.css';

const PagginationItem = ({number, active = false, disabled = false, dots = false, children, ...props}) => {
    return (
        <div className={`number__btn${active ? " active" : ""}${disabled ? " disabled" : ""}${dots ? " dots" : ""}`} {...props}>
            {number}
            {children}
        </div>
    )
}

export default PagginationItem;