import React from 'react';
import { Navigate } from 'react-router-dom';

import Preloader from '../Preloader';
import { useSelector } from 'react-redux';

const AdminWrapper = ({children}) => {
    const {user, userIsLoading} = useSelector(state => state.user);

    if(userIsLoading){
        return <Preloader />
    }

    if(user.roles){
        if(!user.roles.includes("admin")){
            return <Navigate to="/404" />;
        }
    }
    else{
        return <Navigate to="/404" />;
    }

    return children;
}

export default AdminWrapper;