import React from 'react';
import {Link} from 'react-router-dom';

import './index.css';

const Button = ({text, isLink = false, disabled = false, children, className, small = false, ...props}) => {
    return(
        <>
            {isLink
            ? <Link {...props} className={`default__button${small ? " reload__btn" : ""}${className ? " " + className : ""}${disabled ? " disabled" : ""}`}>
                {text}
                {children}
            </Link>
            : <button {...props} className={`button default__button${small ? " reload__btn" : ""}${className ? " " + className : ""}${disabled ? " disabled" : ""}`}>
                {text}
                {children}
            </button>}
        </>
    )
}

export default Button;