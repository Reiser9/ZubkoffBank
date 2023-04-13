import React from 'react';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

import './index.css';

import {User} from '../../components/Icons';

const Header = () => {
    const {isAuth} = useSelector(state => state.auth);
    const {user} = useSelector(state => state.user);

    const {firstName} = user;

    return(
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <Link to="/" className="header__logo--inner">
                        <img src="/assets/img/logo1.svg" alt="logo" className="header__logo" />
                    </Link>
                    
                    {isAuth
                    ? <Link to="/profile" className="header__profile">
                        <User className="header__profile--icon" />

                        <p className="header__profile--name">
                            {firstName}
                        </p>
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