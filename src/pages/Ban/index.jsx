import React from 'react';

import './index.css';

import { BanIcon } from '../../components/Icons';
import Button from '../../components/Button';

const Ban = () => {
    React.useEffect(() => {
        document.title = `${process.env.REACT_APP_BANK_NAME} Bank - 404`;
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="ban">
            <div className="ban__inner">
                <BanIcon className="ban__icon" />

                <p className="ban__title">
                    Ваш аккаунт заблокирован
                </p>

                <p className="ban__text">
                    Мы пытаемся выснить причину блокировки...
                </p>

                <Button isLink to="/" className="ban__link">
                    На главную
                </Button>
            </div>
        </div>
    )
}

export default Ban;