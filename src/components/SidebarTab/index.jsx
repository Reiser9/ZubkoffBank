import React from 'react';
import {Link} from 'react-router-dom';

import './index.css';

const SidebarTab = ({text, icon, name, tab, setTab, setActive, isLink = false, ...props}) => {
    const tabClick = () => {
        setTab(name);
        setActive(true);
    }

    return(
        <>
            {isLink ? <Link className="sidebar-tab" {...props}>
                {icon}

                <p className="sidebar-tab__text">{text}</p>
            </Link>
            : <div className={`sidebar-tab${tab === name ? " active" : ""}`} onClick={tabClick} {...props}>
                {icon}
    
                <p className="sidebar-tab__text">{text}</p>
            </div>}
        </>
    )
}

export default SidebarTab;