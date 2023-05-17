import React from 'react';
import { Telegram, Vk, Tiktok, Instagram } from '../../components/Icons';
import { Link } from 'react-router-dom';

import './index.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__inner">
                    <div className="footer-top">
                        <div className="footer-top__inner">
                            <div className="footer__column">
                                <Link to="/" className="footer__logo--inner">
                                    <img src="/assets/img/logo1.svg" alt="logo" className="footer__logo" />
                                </Link>

                                <p className="footer__text">Он такой один</p>

                                <div className="footer__social">
                                    <Link to="https://t.me/zubkoffbot" target="_blank" className="footer__icon--inner">
                                        <Telegram className="footer__icon" />
                                    </Link>

                                    <Link to="https://vk.com/club220655047" target="_blank" className="footer__icon--inner">
                                        <Vk className="footer__icon" />
                                    </Link>
                                </div>
                            </div>

                            <div className="footer__column">
                                <p className="footer__label">Банк</p>

                                <Link to="/cards" className="footer__text footer__link">Карты</Link>

                                <Link to="/profile" className="footer__text footer__link">Переводы</Link>
                            </div>

                            <div className="footer__column">
                                <p className="footer__label">Возможности</p>

                                <Link to="/sign" className="footer__text footer__link">Вход</Link>

                                <Link to="/sign" className="footer__text footer__link">Стать клиентом</Link>

                                <Link to="/profile" className="footer__text footer__link">Оформить карту</Link>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <div className="footer-bottom__inner">
                            <p className="footer__policy">&copy; 2023</p>

                            <div className="footer__dot"></div>

                            <p className="footer__policy">{process.env.REACT_APP_BANK_NAME} Bank</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;