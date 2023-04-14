import React from 'react';

import './index.css';

import { Back, Card, User } from '../../components/Icons';
import SidebarItem from '../../components/SidebarItem';
import SidebarTab from '../../components/SidebarTab';
import BackButton from '../../components/Button/BackButton';
import PageSidebarInner from '../../components/PageSidebarInner';
import AdminCardsTab from './AdminCardsTab';
import AdminUsersTab from './AdminUsersTab';
import AdminWrapper from '../../components/Wrappers/AdminWrapper';
import AdminCreateType from './AdminCreateType';

const settingsTabs = [
    {
        text: "Пользователи",
        icon: <User />,
        names: ["users"]
    },
    {
        text: "Карты",
        icon: <Card />,
        names: ["cards", "createType"]
    },
]

const Admin = () => {
    const [tab, setTab] = React.useState("users");
    const [active, setActive] = React.useState(false);

    return (
        <AdminWrapper>
            <PageSidebarInner pageTitle="Админка">
                <div className={`profile__sidebar${active ? " active" : ""}`}>
                    <SidebarItem title="Админка">
                        <div className="sidebar__tabs">
                            {settingsTabs.map((data, id) => <SidebarTab key={id} setActive={setActive} names={data.names} text={data.text} icon={data.icon} tab={tab} setTab={setTab} />)}
                        </div>
                    </SidebarItem>
                </div>

                <div className={`profile__content admin__content${active ? " active" : ""}`}>
                    <BackButton onClick={() => setActive(false)} />

                    {tab === "users" &&<AdminUsersTab />}
                    {tab === "cards" && <AdminCardsTab setActive={setTab} />}
                    {tab === "createType" && <AdminCreateType />}
                </div>
            </PageSidebarInner>
        </AdminWrapper>
    )
}

export default Admin;