import React from 'react';

import './index.css';

const Modal = ({active, setActive, children}) => {
    return(
        <div className={`cards-popup${active ? " active" : ""}`}>
            <div className="cards-popup__container">
                <div className="cards-popup__inner">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal;