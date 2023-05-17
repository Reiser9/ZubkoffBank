import React from 'react';

import './index.css';

import {Dollar} from '../Icons';
import { getFormatedNumber } from '../../utils/getFormatedNumber';

const CheckItem = ({data, active, setActiveCard, setActive, setTab}) => {
    const {balance, type, id} = data;

    const clickHandler = () => {
        setActive(true);
        setActiveCard(id);
        setTab("card");
    }

    return(
        <div className={`profile__sidebar--check profile__sidebar--check--item${active === id ? " active" : ""}`} onClick={clickHandler}>
            <div className="profile__sidebar--check--icon--inner">
                <Dollar />
            </div>

            <div className="profile__sidebar--check--text--inner">
                <p className="profile__sidebar--check--card--name">
                    {`${process.env.REACT_APP_BANK_NAME} ${type.name}`}
                </p>

                <p className="profile__sidebar--check--card--balance">
                    {getFormatedNumber(balance)} ₽
                </p>
            </div>
        </div>
    )
}

export default CheckItem;