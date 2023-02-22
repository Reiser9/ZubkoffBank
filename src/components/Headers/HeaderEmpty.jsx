import React from 'react';
import {Link} from 'react-router-dom';

import './index.css';

const HeaderEmpty = () => {
    return(
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <Link to="/" className="header__logo--inner">
                        <img src="/assets/img/logo1.svg" alt="logo" className="header__logo" />
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default HeaderEmpty;