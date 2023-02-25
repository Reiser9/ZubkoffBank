import React from 'react';
import {Outlet} from 'react-router-dom';

import Header from '../Headers';
import Footer from '../Footer';

const DefaultWrapper = () => {
    return(
        <>
            <Header />

            <Outlet />

            <Footer />
        </>
    )
}

export default DefaultWrapper;