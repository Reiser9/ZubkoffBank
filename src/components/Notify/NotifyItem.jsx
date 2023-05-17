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

    const notifyTimeout = React.useRef();
    const notifyInterval = React.useRef();

    const [progress, setProgress] = React.useState(100);

    const dispatch = useDispatch();

    const remove = React.useCallback(() => {
        dispatch(removeNotify(id));
    }, [dispatch, id]);

    const removeOnClick = () => {
        remove();
        clearTimeout(notifyTimeout.current);
    }

    React.useEffect(() => {
        notifyTimeout.current = setTimeout(remove, time);

        notifyInterval.current = setInterval(() => {
            setProgress(progress => progress - 1);
        }, time / 100);

        return () => {
            clearInterval(notifyInterval.current);
            clearTimeout(notifyTimeout.current);
        }
    }, [remove, time]);
    
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

export default React.memo(NotifyItem);