import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './index.css';

import useAuth from '../../hooks/useAuth';
import useNotify from '../../hooks/useNotify';

import Button from '../../components/Button';
import Input from '../../components/Input';

const SaveTab = () => {
    const [password, setPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [newPasswordAgain, setNewPasswordAgain] = React.useState("");

    const {authIsLoading} = useSelector(state => state.auth);
    const {changePassword} = useAuth();
    const {alertNotify} = useNotify();

    const changePasswordHandler = async () => {
        if(password.length < 8 || newPassword.length < 8){
            return alertNotify("Предупреждение", "Пароль не может быть меньше 8 символов", "warn");
        }
        if(newPassword !== newPasswordAgain){
            return alertNotify("Предупреждение", "Пароли не совпадают", "warn");
        }

        changePassword(password, newPassword);
    }

    return (
        <>
            <div className="setting__block">
                <h4 className="setting__title">Смена пароля</h4>

                <div className="setting__items">
                    <div className="setting__item"><Input value={password} setValue={setPassword} className="setting__input" placeholder="Старый пароль" password /></div>
                    <div className="setting__item"><Input value={newPassword} setValue={setNewPassword} className="setting__input" placeholder="Новый пароль" password /></div>
                    <div className="setting__item"><Input value={newPasswordAgain} setValue={setNewPasswordAgain} className="setting__input" placeholder="Повторите новый пароль" password /></div>

                    <Button className="setting__item setting__item_btn" disabled={authIsLoading} onClick={changePasswordHandler}>Изменить</Button>
                </div>
            </div>

            <Link className="setting__delete-account-btn">Удалить аккаунт</Link>
        </>
    )
}

export default SaveTab;