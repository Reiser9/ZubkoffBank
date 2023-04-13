import React from 'react';

import './index.css';

import Button from '../Button';

const Choice = ({text1, text2, title, value, setValue}) => {
    return (
        <div className="input__item">
            {title && <p className="input__title">{title}</p>}

            <div className="choice__button--inner">
                <Button className={`setting__sex-btn${!value ? " opacity" : ""}`} onClick={() => setValue(true)}>{text1}</Button>
                <Button className={`setting__sex-btn${value ? " opacity" : ""}`} onClick={() => setValue(false)}>{text2}</Button>
            </div>
        </div>
    )
}

export default Choice;