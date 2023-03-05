import React from 'react';

import '../Profile/index.css';
import './index.css';

import SidebarItem from '../../components/SidebarItem';
import SidebarTab from '../../components/SidebarTab';

import { NotifyOkIcon, Lock, SettingsIcon } from '../../components/Icons';

const settingsTabs = [
    {
        text: "Данные",
        icon: <SettingsIcon />,
        name: "data"
    },
    {
        text: "Верификация",
        icon: <NotifyOkIcon />,
        name: "verify"
    },
    {
        text: "Безопасность",
        icon: <Lock />,
        name: "save"
    }
]

const Settings = () => {
    const [tab, setTab] = React.useState("data");

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
                            <div className="sidebar__tabs">
                                {settingsTabs.map((data, id) => <SidebarTab key={id} name={data.name} text={data.text} icon={data.icon} tab={tab} setTab={setTab} />)}
                            </div>
                        </SidebarItem>
                    </div>

                    <div className="profile__content">
                        {tab === "data" && <p>Дата</p>}
                        {tab === "verify" && <p>Верифай</p>}
                        {tab === "save" && <p>Безопасность</p>}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Settings;