import React from 'react';

import './index.css';

const Notify = ({title, text, type}) => {
    return(
        <div className={`notifies__item ${type.TYPE}`}>
            {type.ICON}

            <div className="notifies__content">
                <h4 className="notifies__title">{title}</h4>

                <p className="notifies__text">{text}</p>
            </div>
        </div>
    )
}

export default Notify;