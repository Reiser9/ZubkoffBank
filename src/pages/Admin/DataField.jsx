import React from 'react';

import './index.css';

const DataField = ({title, value, big = false}) => {
    return (
        <div className={`section-admin__item${big ? " section-admin__item_full" : ""}`}>
            <p className="section-admin__label">{title}</p>
            
            <p className="section-admin__value">{value}</p>
        </div>
    )
}

export default DataField;