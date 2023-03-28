import React from 'react';

import './index.css';

const SidebarButton = ({text, icon, ...props}) => {
    return (
        <div className="sidebar-tab" {...props}>
            {icon}

            <p className="sidebar-tab__text">{text}</p>
        </div>
    )
}

export default SidebarButton;