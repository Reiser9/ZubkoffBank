import React from 'react';

import './index.css';

import {INPUT_MASK_TYPE} from '../../consts/INPUT_MASK_TYPE';

import useUser from '../../hooks/useUser';

import Input from '../../components/Input';
import Button from '../../components/Button';
import VerifyStage from './VerifyStage';
import Preloader from '../../components/Preloader';

const VerifyTab = () => {
    const {user, userIsLoading} = useUser();

    const {verified} = user;

    if(userIsLoading){
        return <Preloader />
    }

    return (
        <>
            {verified === "NOT VERIFIED" && <>
                <div className="setting__block">
                    <h4 className="setting__title">Информация</h4>

                    <div className="setting__items">
                        {/* Сделать Date Picker */}
                        <div className="setting__item"><Input mask={INPUT_MASK_TYPE.PASSPORT_DATA} className="setting__input" placeholder="Серия и номер паспорта" /></div>
                        <div className="setting__item"><Input className="setting__input" placeholder="Кем выдан" /></div>
                        <div className="setting__item"><Input mask={INPUT_MASK_TYPE.DATE} className="setting__input" placeholder="Дата выдачи" /></div>
                        <div className="setting__item"><Input mask={INPUT_MASK_TYPE.DATE} className="setting__input" placeholder="Дата рождения" /></div>
                    </div>
                </div>

                <div className="setting__block">
                    {/* Сделать рабочим компонентом */}
                    <h4 className="setting__title">Пол</h4>

                    <div className="setting__item">
                        <Button className="setting__sex-btn">Мужской</Button>
                        <Button className="setting__sex-btn" disabled>Женский</Button>
                    </div>
                </div>

                <Button className="setting__verify-btn">Верифицировать</Button>
            </>}

            {verified === "PROCESS" && <VerifyStage icon="clock" text="Данные на этапе проверки, пожалуйста, ожидайте" />}
            {verified === "VERIFIED" && <VerifyStage icon="check" text="Верификация успешно пройдена" />}
        </>
    )
}

export default VerifyTab;