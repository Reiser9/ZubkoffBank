import React from 'react';

import './index.css';

import { Back } from '../Icons';
import Button from './index';

const BackButton = ({desktop = false, ...props}) => {
    return (
        <Button className={`admin__btn${desktop ? "" : " admin__back-btn"}`} {...props}>
            <Back className="admin__icon" />

            Назад
        </Button>
    )
}

export default BackButton;