import React from 'react';
import {Outlet} from 'react-router-dom';

import HeaderEmpty from '../Headers/HeaderEmpty';

const EmptyWrapper = () => {
    return(
        <>
            <HeaderEmpty />

            <Outlet />
        </>
    )
}

export default EmptyWrapper;