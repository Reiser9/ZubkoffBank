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
                                    <Link to="/" className="footer__icon--inner">
                                        <Telegram className="footer__icon" />
                                    </Link>
                                    <Link to="/" className="footer__icon--inner">
                                        <Vk className="footer__icon" />
                                    </Link>
                                    <Link to="/" className="footer__icon--inner">
                                        <Tiktok className="footer__icon" />
                                    </Link>
                                    <Link to="/" className="footer__icon--inner">
                                        <Instagram className="footer__icon" />
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
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.99997 0C3.58873 0 0 3.58873 0 7.99997C0 12.4112 3.58873 15.9999 7.99997 15.9999C12.4112 15.9999 15.9999 12.4112 15.9999 7.99997C15.9999 3.58873 12.4112 0 7.99997 0ZM7.99997 14.9592C4.16267 14.9592 1.04078 11.8373 1.04078 7.99997C1.04078 4.16261 4.16267 1.04078 7.99997 1.04078C11.8373 1.04078 14.9592 4.16267 14.9592 7.99997C14.9592 11.8373 11.8373 14.9592 7.99997 14.9592Z" fill="#333" />
                                <path d="M11.2635 9.30364C11.0213 9.14885 10.6995 9.21957 10.5446 9.46161C10.0419 10.2476 9.18565 10.7168 8.25409 10.7168C6.75606 10.7168 5.53736 9.49803 5.53736 8C5.53736 6.50197 6.75606 5.28321 8.25409 5.28321C9.15801 5.28321 10.0003 5.73115 10.5073 6.48144C10.6681 6.71949 10.9915 6.78217 11.2298 6.62125C11.4679 6.4604 11.5305 6.13689 11.3696 5.89872C10.6689 4.86158 9.50419 4.24243 8.25409 4.24243C6.18219 4.24243 4.49658 5.92804 4.49658 8C4.49658 10.072 6.18219 11.7576 8.25409 11.7576C9.54241 11.7576 10.7265 11.1089 11.4214 10.0224C11.5763 9.78032 11.5056 9.45854 11.2635 9.30364Z" fill="#333" />
                            </svg>
                            <p className="footer__policy">2023</p>
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