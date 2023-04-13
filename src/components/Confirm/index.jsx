import React from 'react';

import './index.css';

import Button from '../Button';
import Input from '../Input';

const Confirm = ({active, setActive, text, action = () => {}, input = false, value, setValue, password = false}) => {
    const closeModal = () => {
        setActive(false);
    }

    const actionFunction = () => {
        action();
        closeModal();
    }

    return (
        <div className={`confirm-popup${active ? " active" : ""}`}>
            <div className="confirm-popup__container">
                <div className="confirm-popup__inner">
                    <h4 className="confirm-popup__title">Подтвердите действие</h4>
                    
                    <p className="confirm-popup__text">{text}</p>

                    {input && <Input value={value} setValue={setValue} placeholder="Введите пароль" password={password} />}

                    <div className="confirm-popup__btns">
                        <Button className="confirm-popup__btn" onClick={closeModal}>Отмена</Button>

                        <Button className="red-btn confirm-popup__btn" onClick={actionFunction}>Да</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Confirm;