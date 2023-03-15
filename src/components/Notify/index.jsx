import React from 'react';
import { useDispatch } from 'react-redux';

import './index.css';

import {removeNotify} from '../../redux/slices/notify';
import { NOTIFY } from '../../consts/NOTIFY';

const notifyArr = {
    "success": NOTIFY.SUCCESS,
    "info": NOTIFY.INFO,
    "warn": NOTIFY.WARN,
    "error": NOTIFY.ERROR,
};

const Notify = ({data}) => {
    const {id, title, text, type, time} = data;

    const dispatch = useDispatch();

    const remove = () => {
        dispatch(removeNotify(id));
    }

    const removeClick = () => {
        clearTimeout(notifyTimeout);
        remove();
    }

    const notifyTimeout = setTimeout(remove, time);

    // Сделать прогресс бар 😡
    
    return(
        <div className={`notifies__item ${notifyArr[type].TYPE}`} onClick={removeClick}>
            {notifyArr[type].ICON}

            <div className="notifies__content">
                <h4 className="notifies__title">{title}</h4>

                <p className="notifies__text">{text}</p>
            </div>
        </div>
    )
}

export default Notify;