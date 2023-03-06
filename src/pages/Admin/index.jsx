import React from 'react';

import '../Profile/index.css';
import './index.css';

import SidebarItem from '../../components/SidebarItem';
import SidebarTab from '../../components/SidebarTab';

import { User } from '../../components/Icons';

const settingsTabs = [
    {
        text: "Пользователи",
        icon: <User />,
        name: "users"
    },
]

const Admin = () => {
    const [tab, setTab] = React.useState("users");

    React.useEffect(() => {
        document.title = `${process.env.REACT_APP_BANK_NAME} Bank - Админка`;
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="profile">
            <div className="container">
                <div className="profile__inner">
                    <div className="profile__sidebar">
                        <SidebarItem title="Админка">
                            <div className="sidebar__tabs">
                                {settingsTabs.map((data, id) => <SidebarTab key={id} name={data.name} text={data.text} icon={data.icon} tab={tab} setTab={setTab} />)}
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

export default Admin;