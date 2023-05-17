import React from 'react';

import './index.css';

import ReloadButton from '../ReloadButton';

const SidebarItem = ({title, withReload = false, reloadActive = false, reloadAction = () => {}, children}) => {
    return(
        <div className="profile__sidebar--block">
            <div className="profile__sidebar--wrapper">
                <p className="profile__sidebar--title">
                    {title}
                </p>

                {withReload && <ReloadButton active={reloadActive} action={reloadAction} />}
            </div>

            {children}
        </div>
    )
}

export default SidebarItem;