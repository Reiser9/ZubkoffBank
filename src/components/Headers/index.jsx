import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './index.css';

import { Leave, SettingsIcon, User, UserCircle } from '../../components/Icons';
import { Arrow } from '../../components/Icons';

const Header = () => {
    const [submenuActive, setSubmenuActive] = React.useState(false);

    const documentClickHandler = (e) => {
        const targetElement = e.target;

        if (!targetElement.closest('.submenu') && !targetElement.closest('.header__profile') && !submenuActive) {
            setSubmenuActive(false);
        }
    }

    React.useEffect(() => {
        document.addEventListener("click", documentClickHandler);

        return () => document.removeEventListener("click", documentClickHandler);
    }, []);

    const { isAuth } = useSelector(state => state.auth);
    const { user } = useSelector(state => state.user);

    const { firstName } = user;

    return (
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <Link to="/" className="header__logo--inner">
                        <img src="/assets/img/logo1.svg" alt="logo" className="header__logo" />
                    </Link>

                    {isAuth
                        ? <div className="header__profile--inner">
                            <div className="header__profile" onClick={() => setSubmenuActive(prev => !prev)}>
                                <User className="header__profile--icon" />

                                <p className="header__profile--name">
                                    {firstName}
                                </p>

                                <Arrow className={`header__profile--arrow${submenuActive? " active": ""}`} />
                            </div>

                            <div className={`submenu submenu_header${submenuActive? " active": ""}`}>
                                <div className="submenu__item">
                                    <UserCircle className="submenu__icon" />

                                    <p className="submenu__text">
                                        Профиль
                                    </p>
                                </div>
                                
                                <div className="submenu__item">
                                    <Leave className="submenu__icon" />

                                    <p className="submenu__text">
                                        Выйти
                                    </p>
                                </div>
                                
                                <div className="submenu__item">
                                    <SettingsIcon className="submenu__icon" />

                                    <p className="submenu__text">
                                        Настройки
                                    </p>
                                </div>
                            </div>
                        </div>
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