import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import "./App.css";

import {NOTIFY} from './consts';
import {withSuspense} from './hoc/withSuspense';

import DefaultWrapper from './components/Wrappers/DefaultWrapper';
import EmptyWrapper from './components/Wrappers/EmptyWrapper';
import Notify from './components/Notify';

const Main = React.lazy(() => import('./pages/Main'));
const Cards = React.lazy(() => import('./pages/Cards'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Sign = React.lazy(() => import('./pages/Sign'));
const Recovery = React.lazy(() => import('./pages/Recovery'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Admin = React.lazy(() => import('./pages/Admin'));
const Api = React.lazy(() => import('./pages/Api'));

const App = () => {
    const notifyState = useSelector(state => state.notify);

    const dispatch = useDispatch();

    return (
        <>
            <Routes>    
                <Route path="/" element={<DefaultWrapper />}>
                    <Route index element={withSuspense(Main)} />
                    <Route path="cards" element={withSuspense(Cards)} />
                    <Route path="profile" element={withSuspense(Profile)} />
                    <Route path="settings" element={withSuspense(Settings)} />
                    <Route path="admin" element={withSuspense(Admin)} />
                    <Route path="api" element={withSuspense(Api)} />
                    <Route path="*" element={<Navigate to={"/404"} />} />
                </Route>

                <Route path="/" element={<EmptyWrapper />}>
                    <Route path="sign" element={withSuspense(Sign)} />
                    <Route path="recovery" element={withSuspense(Recovery)} />
                    <Route path="404" element={withSuspense(NotFound)} />
                </Route>
            </Routes>

            {notifyState.notify.length > 0 && <div className="notifies">
                {notifyState.notify.map((data, id) => <Notify key={id} title={data.title} text={data.text} type={data.type} />)}
            </div>}
        </>
    );
};

export default App;