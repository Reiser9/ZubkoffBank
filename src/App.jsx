import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

import "./App.css";

import {withSuspense} from './hoc/withSuspense';
import DefaultWrapper from './components/Wrappers/DefaultWrapper';
import EmptyWrapper from './components/Wrappers/EmptyWrapper';

const Main = React.lazy(() => import('./pages/Main'));
const Sign = React.lazy(() => import('./pages/Sign'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<DefaultWrapper />}>
                <Route index element={withSuspense(Main)} />
                <Route path="*" element={<Navigate to={"/404"} />} />
            </Route>

            <Route path="/" element={<EmptyWrapper />}>
                <Route path="sign" element={withSuspense(Sign)} />
                <Route path="404" element={withSuspense(NotFound)} />
            </Route>
        </Routes>
    );
};

export default App;
