import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const NoAuthWrapper = ({children}) => {
    const auth = useSelector(state => state.auth);

    if(auth.isAuth){
        return <Navigate to="/" />
    }

    return children;
}

export default NoAuthWrapper;