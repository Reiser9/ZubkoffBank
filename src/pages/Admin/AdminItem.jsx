import React from 'react';

import './index.css';

import {Arrow} from '../../components/Icons';

const AdminItem = ({id, title, children}) => {
    const [active, setActive] = React.useState(false);

    return (
        <div className={`item-admin${active ? " active" : ""}`}>
            <div className="item-admin__header" onClick={() => setActive(prev => !prev)}>
                <div className="item-admin__title">
                    <div className="item-admin__number">{id}</div>

                    <p className="item-admin__name">{title}</p>
                </div>

                <div className="item-admin__open-btn">
                    <Arrow className="item-admin__arrow" />
                </div>
            </div>

            <div className="item-admin__content">
                {children}
            </div>
        </div>
    )
}

export default AdminItem;