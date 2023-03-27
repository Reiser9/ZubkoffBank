import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';

import Button from '../../components/Button';
import Input from '../../components/Input';

const SaveTab = () => {
    return (
        <>
            <div className="setting__block">
                <h4 className="setting__title">Смена пароля</h4>

                <div className="setting__items">
                    <div className="setting__item"><Input className="setting__input" placeholder="Старый пароль" password /></div>
                    <div className="setting__item"><Input className="setting__input" placeholder="Новый пароль" password /></div>
                    <div className="setting__item"><Input className="setting__input" placeholder="Повторите новый пароль" password /></div>

                    <Button className="setting__item setting__item_btn">Изменить</Button>
                </div>
            </div>

            <Link className="setting__delete-account-btn">Удалить аккаунт</Link>
        </>
    )
}

export default SaveTab;