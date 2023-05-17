import React from 'react';
import {Link} from 'react-router-dom';

import './index.css';

const SidebarTab = ({text, icon, names, tab, setTab, setActive, isLink = false, ...props}) => {
    const tabClick = () => {
        setTab(names[0]);
        setActive(true);
    }

    return(
        <>
            {isLink ? <Link className="sidebar-tab" {...props}>
                {icon}

                <p className="sidebar-tab__text">{text}</p>
            </Link>
            : <div className={`sidebar-tab${names.includes(tab) ? " active" : ""}`} onClick={tabClick} {...props}>
                {icon}
    
                <p className="sidebar-tab__text">{text}</p>
            </div>}
        </>
    )
}

export default SidebarTab;