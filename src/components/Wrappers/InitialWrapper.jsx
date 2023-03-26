import React from 'react';
import { useSelector } from 'react-redux';

import useAuth from '../../hooks/useAuth';

import Preloader from '../Preloader';
import Ban from '../../pages/Ban';

const InitialWrapper = ({children}) => {
    const {authIsLoading, isAuth} = useSelector(state => state.auth);
    const {user, userIsLoading} = useSelector(state => state.user);
    const {checkAuth} = useAuth();

    React.useEffect(() => {
        checkAuth();
    }, []);

    if(authIsLoading || userIsLoading){
        return <Preloader />
    }

    if(isAuth && user.roles.includes("blocked")){
        return <Ban />
    }

    return children;
}

export default InitialWrapper;