import React from 'react';

import './index.css';

import {NotFoundIcon} from '../../components/Icons';
import Button from '../../components/Button';

const NotFound = () => {
    return(
        <div className="notfound">
            <div className="notfound__inner">
                <NotFoundIcon className="notfound__icon" />

                <p className="notfound__title">
                    К сожалению, такой страницы на нашем сайте нет
                </p>

                <p className="notfound__text">
                    Но мы сделаем все, что бы она обязательно появилась!
                </p>

                <Button isLink to="/" className="notfound__link">
                    На главную
                </Button>
            </div>
        </div>
    )
}

export default NotFound;