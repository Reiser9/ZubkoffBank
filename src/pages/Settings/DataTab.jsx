import React from 'react';
import { useSelector } from 'react-redux';

import './index.css';

import {VERIFY_STATUS} from '../../consts/VERIFY_STATUS';

import useUser from '../../hooks/useUser';
import {maskPhone} from '../../utils/maskPhone';
import {getNormalDate} from '../../utils/getNormalDate';

import Preloader from '../../components/Preloader';
import Input from '../../components/Input';
import EmptyBlock from '../../components/EmptyBlock';

const DataTab = () => {
    const {getUserFullInfo} = useUser();
    const {user, userIsLoading} = useSelector(state => state.user);

    const {firstName, secondName, middleName, phoneNum, sex, verified, birthdate, passportNum, passportSer, granted, grantedDate} = user;

    React.useEffect(() => {
        getUserFullInfo();
    }, []);

    if(userIsLoading){
        return <Preloader />
    }

    return (
        <>
            <div className="setting__block">
                <h4 className="setting__title">Краткая информация</h4>

                <div className="setting__items">
                    <div className="setting__item"><Input value={firstName} title="Имя" readOnly className="setting__input" placeholder="Имя" /></div>
                    <div className="setting__item"><Input value={secondName} title="Фамилия" readOnly className="setting__input" placeholder="Фамилия" /></div>
                    <div className="setting__item"><Input value={middleName} title="Отчество" readOnly className="setting__input" placeholder="Отчество" /></div>
                    <div className="setting__item"><Input value={maskPhone(phoneNum)} title="Номер телефона" readOnly className="setting__input" placeholder="Номер телефона" /></div>
                </div>
            </div>

            {verified !== VERIFY_STATUS.NOT_VERIFIED && <div className="setting__block">
                <h4 className="setting__title">Полные данные</h4>

                <div className="setting__items">
                    <div className="setting__item"><Input value={sex ? "Мужской" : "Женский"} title="Пол" readOnly className="setting__input" placeholder="Пол" /></div>
                    <div className="setting__item"><Input value={getNormalDate(birthdate)} title="Дата рождения" readOnly className="setting__input" placeholder="Дата рождения" /></div>
                    <div className="setting__item"><Input value={`${passportSer} ${passportNum}`} title="Серия и номер паспорта" readOnly className="setting__input" placeholder="Серия и номер паспорта" /></div>
                    <div className="setting__item"><Input value={granted} title="Паспорт выдан" readOnly className="setting__input" placeholder="Кем выдан" /></div>
                    <div className="setting__item"><Input value={getNormalDate(grantedDate)} title="Дата выдачи" readOnly className="setting__input" placeholder="Дата выдачи" /></div>
                </div>
            </div>}

            {verified === VERIFY_STATUS.NOT_VERIFIED && <EmptyBlock title="Что бы все данные отобразились - нужно пройти верификацию" />}
        </>
    )
}

export default DataTab;