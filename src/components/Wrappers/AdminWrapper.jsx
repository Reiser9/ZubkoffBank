import React from 'react';
import { Navigate } from 'react-router-dom';

import useUser from '../../hooks/useUser';

import Preloader from '../Preloader';

const AdminWrapper = ({children}) => {
    const {user, userIsLoading} = useUser();

    if(userIsLoading){
        return <Preloader />
    }

    if(!user?.roles?.includes("admin")){
        return <Navigate to="/" />;
    }

    return children;
}

export default AdminWrapper;