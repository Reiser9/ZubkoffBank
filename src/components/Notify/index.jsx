import React from 'react';

import './index.css';

const Notify = ({title, text, notifyType, icon}) => {
    return(
        <div className={`notifies__item ${notifyType}`}>
            {icon}

            <div className="notifies__content">
                <h4 className="notifies__title">{title}</h4>

                <p className="notifies__text">{text}</p>
            </div>
        </div>
    )
}

export default Notify;