import React from 'react';

import './index.css';

const VerifyStage = ({icon, text, absolute = false, children}) => {
    return (
        <div className={`setting__block setting__block_verif${absolute ? " absolute__block" : ""}`}>
            <div className="setting__verif-icon--inner">
                <img src={`assets/img/${icon}.svg`} alt="icon" className="setting__verif-icon"/>
            </div>

            <h4 className="setting__label setting__label_verif">{text}</h4>

            {children}
        </div>
    )
}

export default VerifyStage;