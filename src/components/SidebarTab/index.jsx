import React from 'react';

import './index.css';

const SidebarTab = ({text, icon, name, tab, setTab}) => {
    return(
        <div className={`sidebar-tab${tab === name ? " active" : ""}`} onClick={() => setTab(name)}>
            {icon}

            <p className="sidebar-tab__text">{text}</p>
        </div>
    )
}

export default SidebarTab;