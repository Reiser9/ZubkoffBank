import React from 'react';
import { Close } from '../Icons';

import './index.css';

const Modal = ({ active, setActive, title, children }) => {
    const documentClickHandler = (e) => {
        const targetElement = e.target;

        if (targetElement.closest('.cards-popup') 
        && !targetElement.closest('.cards-popup__inner') 
        && !active) {
            setActive(false);
        }
    }

    React.useEffect(() => {
        document.addEventListener("click", documentClickHandler);

        return () => document.removeEventListener("click", documentClickHandler);
    }, []);

    return (
        <div className={`cards-popup${active ? " active" : ""}`}>
            <div className="cards-popup__container">
                <div className="cards-popup__inner">
                    <div className="cards-popup__header">
                        <h2 className="cards-popup__title title">{title}</h2>

                        <div className="cards-popup__close--inner" onClick={() => setActive(false)} >
                            <Close className="cards-popup__close-btn" />
                        </div>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal;