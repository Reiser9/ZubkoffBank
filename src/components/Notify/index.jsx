import React from 'react';
import { useSelector } from 'react-redux';

import NotifyItem from './NotifyItem';

const Notifies = () => {
    const notify = useSelector(state => state.notify);

    return (
        <>
            {notify.notify.length && <div className="notifies">
                {notify.notify.map((data) => <NotifyItem key={data.id} data={data} />)}
            </div>}
        </>
    )
}

export default Notifies;