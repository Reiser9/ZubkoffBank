import React from 'react';

import './index.css';

const NotContentBlock = ({text, icon, children}) => {
    return (
        <div className="unavailable">
            <div className="unavailable__icon--inner">
                <img src={`/assets/img/${icon}.svg`} alt="icon" className="unavailable__icon"/>
            </div>

            <p className="unavailable__text">{text}</p>

            {children}
        </div>
    )
}

export default NotContentBlock;