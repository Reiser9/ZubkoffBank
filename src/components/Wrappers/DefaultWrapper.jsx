import React from 'react';
import {Outlet} from 'react-router-dom';

import Header from '../Headers';

const DefaultWrapper = ({children}) => {
    return(
        <>
            <Header />

            <Outlet />
        </>
    )
}

export default DefaultWrapper;