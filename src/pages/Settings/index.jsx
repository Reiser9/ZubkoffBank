import React from 'react';

import '../Profile/index.css';
import './index.css';

import SidebarItem from '../../components/SidebarItem';
import { NotifyOkIcon, Lock, SettingsIcon } from '../../components/Icons';

const Settings = () => {
    React.useEffect(() => {
        document.title = `${process.env.REACT_APP_BANK_NAME} Bank - Настройки`;
        window.scrollTo(0, 0);
    }, []);

    return(
        <section className="profile">
            <div className="container">
                <div className="profile__inner">
                    <div className="profile__sidebar">
                        <SidebarItem title="Настройки">
                            <div className="sidebar-tab active">
                                <div className="sidebar-tab__icon--inner">
                                    <Settings className="sidebar-tab__icon" />
                                </div>
                                <p className="sidebar-tab__text">Данные</p>
                            </div>
                            <div className="sidebar-tab">
                                <div className="sidebar-tab__icon--inner">
                                    <NotifyOkIcon className="sidebar-tab__icon" />
                                </div>
                                <p className="sidebar-tab__text">Верификация</p>
                            </div>
                            <div className="sidebar-tab">
                                <div className="sidebar-tab__icon--inner">
                                    <Lock className="sidebar-tab__icon" />
                                </div>
                                <p className="sidebar-tab__text">Безопасность</p>
                            </div>
                        </SidebarItem>
                    </div>

                    <div className="profile__content">
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Settings;