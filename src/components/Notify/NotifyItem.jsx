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

    let notifyTimeout;
    let notifyInterval;

    const [progress, setProgress] = React.useState(100);

    const dispatch = useDispatch();

    const remove = () => {
        dispatch(removeNotify(id));
    }

    const removeOnClick = () => {
        remove();
        clearTimeout(notifyTimeout);
    }

    React.useEffect(() => {
        notifyTimeout = window.setTimeout(remove, time);

        notifyInterval = window.setInterval(() => {
            setProgress(progress => progress - 1);
        }, time / 100);

        return () => {
            clearTimeout(notifyTimeout);
            clearInterval(notifyInterval);
        }
    }, []);
    
    return(
        <div className={`notifies__item ${notifyArr[type].TYPE}`} onClick={removeOnClick}>
            {notifyArr[type].ICON}

            <div className="notifies__content">
                <h4 className="notifies__title">{title}</h4>

                <p className="notifies__text">{text}</p>
            </div>

            <div className="notify__progress" style={{width: `${progress}%`}}></div>
        </div>
    )
}

export default NotifyItem;