import React from 'react';
import { useSelector } from 'react-redux';

import useAuth from '../../hooks/useAuth';

import Preloader from '../Preloader';
import Ban from '../../pages/Ban';
import ServerNotAvailable from '../../pages/ServerNotAvailable';

const InitialWrapper = ({children}) => {
    const {appIsLoading, blocked} = useSelector(state => state.app);
    const {isServerAvailable} = useSelector(state => state.server);
    const {checkAuth} = useAuth();

    React.useEffect(() => {
        checkAuth();
    }, []);

    if(appIsLoading){
        return <Preloader />
    }

    if(!isServerAvailable){
        return <ServerNotAvailable />
    }

    if(blocked){
        return <Ban />
    }

    return children;
}

export default InitialWrapper;