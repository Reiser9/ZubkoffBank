import React from 'react';
import {Link} from 'react-router-dom';

import './index.css';

const Button = ({text, isLink = false, disabled = false, children, className, ...props}) => {
    return(
        <>
            {isLink
            ? <Link {...props} className={`default__button${className ? " " + className : ""}${disabled ? " disabled" : ""}`}>
                {text}
                {children}
            </Link>
            : <button {...props} className={`button default__button ${className}${disabled ? " disabled" : ""}`}>
                {text}
                {children}
            </button>}
        </>
    )
}

export default Button;