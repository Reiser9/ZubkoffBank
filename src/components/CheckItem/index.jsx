import React from 'react';

import './index.css';

import {Cart, Car, Dollar} from '../Icons';

const checkIcon = {
    "buy": <Cart />,
    "limit": <Dollar />,
    "drive": <Car />
}

const CheckItem = ({cardName, cardBalance, icon, active = false}) => {
    return(
        <div className={`profile__sidebar--check profile__sidebar--check--item${active ? " active" : ""}`}>
            <div className="profile__sidebar--check--icon--inner">
                {checkIcon[icon]}
            </div>

            <div className="profile__sidebar--check--text--inner">
                <p className="profile__sidebar--check--card--name">
                    {cardName}
                </p>

                <p className="profile__sidebar--check--card--balance">
                    {cardBalance} ₽
                </p>
            </div>
        </div>
    )
}

export default CheckItem;