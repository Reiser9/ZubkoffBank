import React from 'react';

import './index.css';

import { NotifyOkIcon, Lock, SettingsIcon, Card } from '../../components/Icons';
import SidebarItem from '../../components/SidebarItem';
import SidebarTab from '../../components/SidebarTab';
import BackButton from '../../components/Button/BackButton';

import PageSidebarInner from '../../components/PageSidebarInner';
import VerifyTab from './VerifyTab';
import DataTab from './DataTab';
import SaveTab from './SaveTab';
import SubscribesTab from './SubscribesTab';

const settingsTabs = [
    {
        text: "Верификация",
        icon: <NotifyOkIcon />,
        names: ["verify"]
    },
    {
        text: "Данные",
        icon: <SettingsIcon />,
        names: ["data"]
    },
    {
        text: "Безопасность",
        icon: <Lock />,
        names: ["save"]
    },
    {
        text: "Подписки",
        icon: <Card />,
        names: ["subscribes"]
    }
]

const Settings = () => {
    const [tab, setTab] = React.useState("verify");
    const [active, setActive] = React.useState(false);

    return (
        <PageSidebarInner pageTitle="Настройки">
            <div className={`profile__sidebar${active ? " active" : ""}`}>
                <SidebarItem title="Настройки">
                    <div className="sidebar__tabs">
                        {settingsTabs.map((data, id) => <SidebarTab key={id} setActive={setActive} names={data.names} text={data.text} icon={data.icon} tab={tab} setTab={setTab} />)}
                    </div>
                </SidebarItem>
            </div>

            <div className={`profile__content${active ? " active" : ""}`}>
                <BackButton onClick={() => setActive(false)} />

                {tab === "verify" && <VerifyTab />}
                {tab === "data" && <DataTab />}
                {tab === "save" && <SaveTab />}
                {tab === "subscribes" && <SubscribesTab />}
            </div>
        </PageSidebarInner>
    )
}

export default Settings;