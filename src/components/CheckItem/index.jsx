import React from 'react';
import { useSelector } from 'react-redux';

import './index.css';

import {Dollar} from '../Icons';
import { findElementById } from '../../utils/findElement';
import { getFormatedNumber } from '../../utils/getFormatedNumber';

const CheckItem = ({data, active, setActive, setTab}) => {
    const {balance, typeId, id} = data;

    const [name, setName] = React.useState("");

    const {cardTypes} = useSelector(state => state.cardTypes);

    React.useEffect(() => {
        const currentCard = findElementById(cardTypes.content, typeId);
        setName(currentCard?.name);
    }, []);

    const clickHandler = () => {
        setTab(true);
        setActive(id);
    }

    return(
        <div className={`profile__sidebar--check profile__sidebar--check--item${active === id ? " active" : ""}`} onClick={clickHandler}>
            <div className="profile__sidebar--check--icon--inner">
                <Dollar />
            </div>

            <div className="profile__sidebar--check--text--inner">
                <p className="profile__sidebar--check--card--name">
                    {`${process.env.REACT_APP_BANK_NAME} ${name}`}
                </p>

                <p className="profile__sidebar--check--card--balance">
                    {getFormatedNumber(balance)} ₽
                </p>
            </div>
        </div>
    )
}

export default CheckItem;