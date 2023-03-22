import React from 'react';
import InputMask from 'react-input-mask';

import './index.css';

import {Eye, Blind} from '../Icons';

const Input = ({value, setValue, password = false, className, readOnly = false, ...props}) => {
    const onChangeInput = () => {
        if(readOnly){
            return () => {};
        }

        return (e) => setValue(e.target.value);
    }

    const [view, setView] = React.useState(false);

    const changeView = () => {
        setView(prev => !prev);
    }

    return(
        <div className="input__inner">
            <InputMask maskChar={null} value={value} readOnly={readOnly} onChange={onChangeInput} type={password ? (view ? 'text' : 'password') : 'text'} className={`input default__input${className ? " " + className : ""}${password ? " password__input" : ""}`} {...props} />

            {password && (view ? <Blind className="input__icon" onClick={changeView} /> : <Eye className="input__icon" onClick={changeView} />)}
        </div>
    )
}

export default Input;