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

const NotifyItem = ({data}) => {
    const {id, title, text, type, time} = data;
    const notifyTimeout = React.useRef(0);
    const dispatch = useDispatch();

    const remove = () => {
        dispatch(removeNotify(id))
    }

    const removeOnClick = () => {
        remove();
        clearTimeout(notifyTimeout);
    }

    React.useEffect(() => {
        notifyTimeout.current = window.setTimeout(remove, time);

        return () => clearTimeout(notifyTimeout.current);
    }, []);
    
    return(
        <div className={`notifies__item ${notifyArr[type].TYPE}`} onClick={removeOnClick}>
            {notifyArr[type].ICON}

            <div className="notifies__content">
                <h4 className="notifies__title">{title}</h4>

                <p className="notifies__text">{text}</p>
            </div>

            <div className="notify__progress"></div>
        </div>
    )
}

export default React.memo(NotifyItem);