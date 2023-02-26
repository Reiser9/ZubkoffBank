import React from 'react';

import './index.css';

import {Eye, Blind} from '../Icons';

const Input = ({value, setValue, password = false, className, ...props}) => {
    const [view, setView] = React.useState(false);

    const changeView = () => {
        setView(prev => !prev);
    }

    return(
        <div className="input__inner">
            <input value={value} onChange={(e) => setValue(e.target.value)} type={password ? (view ? 'text' : 'password') : 'text'} className={`input default__input${className ? " " + className : ""}${password ? " password__input" : ""}`} {...props} />

            {password && (view ? <Blind className="input__icon" onClick={changeView} /> : <Eye className="input__icon" onClick={changeView} />)}
        </div>
    )
}

export default Input;