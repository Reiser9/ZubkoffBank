import React from 'react';
import {User} from '../../components/Icons';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

import './index.css';

const Header = () => {
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);

    const {firstName} = user.user;

    return(
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <Link to="/" className="header__logo--inner">
                        <img src="/assets/img/logo1.svg" alt="logo" className="header__logo" />
                    </Link>
                    
                    {auth.isAuth
                    ? <Link to="/profile" className="header__profile">
                        <User className="header__profile--icon" />

                        {firstName}
                    </Link>
                    : <Link to="/sign" className="header__profile">
                        <User className="header__profile--icon" />

                        Вход
                    </Link>}
                </div>
            </div>
        </header>
    )
}

export default Header;