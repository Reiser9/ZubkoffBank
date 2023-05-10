import React from 'react';

import './index.css';

import {Reload} from '../Icons';

const ReloadButton = ({active = false, action = () => {}}) => {
    return (
        <button className={`button reload__button${active ? " active" : ""}`} onClick={action}>
            <Reload />
        </button>
    )
}

export default ReloadButton;