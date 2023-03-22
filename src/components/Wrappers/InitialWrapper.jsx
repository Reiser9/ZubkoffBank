import React from 'react';

import useAuth from '../../hooks/useAuth';

const InitialWrapper = ({children}) => {
    const {checkAuth} = useAuth();

    React.useEffect(() => {
        checkAuth();
    }, []);

    return children;
}

export default InitialWrapper;