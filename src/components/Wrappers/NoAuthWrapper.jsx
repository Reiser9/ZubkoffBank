import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import Preloader from '../Preloader';

const NoAuthWrapper = ({children}) => {
    const {authIsLoading, isAuth} = useSelector(state => state.auth);

    if(authIsLoading){
        return <Preloader fill />
    }

    if(isAuth){
        return <Navigate to="/" />
    }

    return children;
}

export default NoAuthWrapper;