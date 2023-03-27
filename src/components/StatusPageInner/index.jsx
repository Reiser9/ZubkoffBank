import React from 'react';

import './index.css';

const StatusPageInner = ({img, title, text, children}) => {
    return (
        <div className="statuspage">
            <div className="statuspage__inner">
                <img src={`/assets/img/${img}.svg`} alt="404" className="statuspage__icon" />

                <p className="statuspage__title">
                    {title}
                </p>

                <p className="statuspage__text">
                    {text}
                </p>

                {children}
            </div>
        </div>
    )
}

export default StatusPageInner;