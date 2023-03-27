import React from 'react';

import './index.css';

import { Arrow } from '../../components/Icons';

const DataItem = ({title, icon, children}) => {
    const [active, setActive] = React.useState(false);

    return (
        <div className={`section-admin${active ? " active" : ""}`}>
            <div className="section-admin__header" onClick={() => setActive(prev => !prev)}>
                <div className="section-admin__title">
                    {icon}

                    {title}
                </div>

                <Arrow className="section-admin__arrow" />
            </div>

            <div className="section-admin__content">
                {children}
            </div>
        </div>
    )
}

export default DataItem;