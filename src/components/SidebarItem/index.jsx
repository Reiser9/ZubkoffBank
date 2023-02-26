import React from 'react';

import './index.css';

const SidebarItem = ({title, children}) => {
    return(
        <div className="profile__sidebar--block">
            <p className="profile__sidebar--title">
                {title}
            </p>

            {children}
        </div>
    )
}

export default SidebarItem;