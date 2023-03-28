import React from 'react';

import './index.css';

import { Back, Card, User } from '../../components/Icons';
import SidebarItem from '../../components/SidebarItem';
import SidebarTab from '../../components/SidebarTab';
import BackButton from '../../components/Button/BackButton';
import PageSidebarInner from '../../components/PageSidebarInner';
import AdminCardsTab from './AdminCardsTab';
import AdminUsersTab from './AdminUsersTab';

const settingsTabs = [
    {
        text: "Пользователи",
        icon: <User />,
        name: "users"
    },
    {
        text: "Карты",
        icon: <Card />,
        name: "cards"
    },
]

const Admin = () => {
    const [tab, setTab] = React.useState("users");
    const [active, setActive] = React.useState(false);

    return (
        <PageSidebarInner pageTitle="Админка">
            <div className={`profile__sidebar${active ? " active" : ""}`}>
                <SidebarItem title="Админка">
                    <div className="sidebar__tabs">
                        {settingsTabs.map((data, id) => <SidebarTab key={id} setActive={setActive} name={data.name} text={data.text} icon={data.icon} tab={tab} setTab={setTab} />)}
                    </div>
                </SidebarItem>
            </div>

            <div className={`profile__content admin__content${active ? " active" : ""}`}>
                <BackButton onClick={() => setActive(false)} />

                {tab === "users" &&<AdminUsersTab />}
                {tab === "cards" && <AdminCardsTab />}
            </div>
        </PageSidebarInner>
    )
}

export default Admin;