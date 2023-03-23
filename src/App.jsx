import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

import "./App.css";

import {withSuspense} from './hoc/withSuspense';

import DefaultWrapper from './components/Wrappers/DefaultWrapper';
import EmptyWrapper from './components/Wrappers/EmptyWrapper';
import Notifies from './components/Notify';

const Main = React.lazy(() => import('./pages/Main'));
const Cards = React.lazy(() => import('./pages/Cards'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Sign = React.lazy(() => import('./pages/Sign'));
const Recovery = React.lazy(() => import('./pages/Recovery'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Admin = React.lazy(() => import('./pages/Admin'));
const Api = React.lazy(() => import('./pages/Api'));
const Ban = React.lazy(() => import('./pages/Ban'));

const App = () => {
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
                    <Route path="ban" element={withSuspense(Ban)} />
                </Route>
            </Routes>

            <Notifies />
        </>
    );
};

export default App;