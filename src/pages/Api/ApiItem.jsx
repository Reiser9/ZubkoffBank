import React from 'react';

import './index.css';

import { Lock } from '../../components/Icons';

const ApiItem = ({data}) => {
    const {method, url, request, response, isAuth} = data;

    return (
        <div className="item-api">
            <div className="item-api__header">
                {isAuth ? <Lock className="item-api__icon" /> : ""}

                <p className={`item-api__method item-api__method_${method.toLowerCase()}`}>{method}</p>

                <p className="item-api__link">{url}</p>
            </div>

            <div className="item-api__content">
                <div className="item-api__column">
                    <p className="item-api__label">request</p>

                    <ul className="item-api__list">
                        {request.map((data, id) => <li key={id} className="item-api__item">{data}</li>)}
                    </ul>
                </div>

                <div className="item-api__column">
                    <p className="item-api__label">response</p>

                    <ul className="item-api__list">
                        {response.map((data, id) => <li key={id} className="item-api__item">{data}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ApiItem;