import React from 'react';
import {User} from '../../components/Icons';
import {Link} from 'react-router-dom';

import './index.css';

const Header = () => {
    const [name, setName] = React.useState("");

    React.useEffect(() => {
        const accessToken = window.localStorage.getItem("accessToken");

        if(accessToken){
            setName(accessToken);
        }
    }, []);

    return(
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <Link to="/" className="header__logo--inner">
                        <img src="/assets/img/logo1.svg" alt="logo" className="header__logo" />
                    </Link>
                        
                    <Link to="/sign" className="header__profile">
                        <User className="header__profile--icon" />

                        {name ? name : "Вход"}
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header;