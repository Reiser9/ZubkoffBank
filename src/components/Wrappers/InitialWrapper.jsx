import React from 'react';
import { useSelector } from 'react-redux';

import useAuth from '../../hooks/useAuth';

import Preloader from '../Preloader';
import Ban from '../../pages/Ban';
import ServerNotAvailable from '../../pages/ServerNotAvailable';

const InitialWrapper = ({children}) => {
    const {authIsLoading, isAuth} = useSelector(state => state.auth);
    const {user, userIsLoading} = useSelector(state => state.user);
    const {isServerAvailable} = useSelector(state => state.server);
    const {checkAuth} = useAuth();

    React.useEffect(() => {
        checkAuth();
    }, []);

    if(authIsLoading || userIsLoading){
        return <Preloader />
    }

    if(!isServerAvailable){
        return <ServerNotAvailable />
    }

    if(isAuth && user.roles.includes("blocked")){
        return <Ban />
    }

    return children;
}

export default InitialWrapper;