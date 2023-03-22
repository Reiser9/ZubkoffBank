import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import Preloader from '../Preloader';

const AuthWrapper = ({children}) => {
    const auth = useSelector(state => state.auth);

    if(auth.authIsLoading){
        return <Preloader fill />
    }

    if(!auth.isAuth){
        return <Navigate to="/" />
    }

    return children;
}

export default AuthWrapper;