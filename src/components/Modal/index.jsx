import React from 'react';
import { Close } from '../Icons';

import './index.css';

const Modal = ({active, setActive, children}) => {
    return(
        <div className={`cards-popup${active ? " active" : ""}`}>
            <div className="cards-popup__container">
                <div className="cards-popup__inner">
                    <Close className="cards-popup__close-btn" onClick={() => setActive(false)} />

                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal;