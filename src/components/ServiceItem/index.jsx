import React from 'react';

import './index.css';

import Button from '../Button';

const ServiceItem = ({title, text, icon, buttonText = false, big = false, buttonLink}) => {
    return(
        <div className={`item-services${big ? " item-services_big" : ""}`}>
            <div className="item-services__icon--inner">
                {icon}
            </div>

            <h4 className="item-services__title">{title}</h4>

            <p className="item-services__text">{text}</p>

            {buttonText && <Button className="item-services__button" isLink={buttonLink} to={buttonLink}>{buttonText}</Button>}
        </div>
    )
}

export default ServiceItem;