import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './index.css';

import useAuth from '../../hooks/useAuth';

import { Leave, SettingsIcon, User, UserCircle } from '../../components/Icons';
import { Arrow } from '../../components/Icons';
import Confirm from '../Confirm';

const Header = () => {
    const [submenuActive, setSubmenuActive] = React.useState(false);
    const [confirmExitModal, setConfirmExitModal] = React.useState(false);

    const { isAuth } = useSelector(state => state.auth);
    const { user } = useSelector(state => state.user);
    const {logout} = useAuth();

    const { firstName, roles } = user;

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

    return (
        <>
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
                                    {roles?.includes("admin") && <Link to="/admin" className="submenu__item">
                                        <User className="submenu__icon" />

                                        <p className="submenu__text">
                                            Админка
                                        </p>
                                    </Link>}

                                    <Link to="/profile" className="submenu__item">
                                        <UserCircle className="submenu__icon" />

                                        <p className="submenu__text">
                                            Профиль
                                        </p>
                                    </Link>

                                    <Link to="/settings" className="submenu__item">
                                        <SettingsIcon className="submenu__icon" />

                                        <p className="submenu__text">
                                            Настройки
                                        </p>
                                    </Link>
                                    
                                    <div className="submenu__item" onClick={() => setConfirmExitModal(true)}>
                                        <Leave className="submenu__icon" />

                                        <p className="submenu__text">
                                            Выйти
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

            <Confirm active={confirmExitModal} setActive={setConfirmExitModal} text="Вы действительно хотите выйти?" action={logout} />
        </>
    )
}

export default Header;