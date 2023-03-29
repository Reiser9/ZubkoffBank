import React from 'react';

import './index.css';

import {VERIFY_STATUS} from '../../consts/VERIFY_STATUS';

import useUser from '../../hooks/useUser';
import {maskPhone} from '../../utils/maskPhone';
import {getNormalDate} from '../../utils/getNormalDate';

import Preloader from '../../components/Preloader';
import Input from '../../components/Input';

const DataTab = () => {
    const {user, userIsLoading, getUserFullInfo} = useUser();
    const {firstName, secondName, middleName, phoneNum, birthdate, sex, granted, grantedDate, passportNum, passportSer, verified} = user;

    React.useEffect(() => {
        getUserFullInfo();
    }, []);

    if(userIsLoading){
        return <Preloader />
    }

    return (
        <>
            <div className="setting__block">
                <h4 className="setting__title">Информация</h4>

                <div className="setting__items">
                    <div className="setting__item"><Input value={firstName} readOnly className="setting__input" placeholder="Имя" /></div>
                    <div className="setting__item"><Input value={secondName} readOnly className="setting__input" placeholder="Фамилия" /></div>
                    <div className="setting__item"><Input value={middleName} readOnly className="setting__input" placeholder="Отчество" /></div>
                    <div className="setting__item"><Input value={maskPhone(phoneNum)} readOnly className="setting__input" placeholder="Номер телефона" /></div>
                    {verified !== VERIFY_STATUS.NOT_VERIFIED && <>
                        <div className="setting__item"><Input value={sex ? "Мужской" : "Женский"} readOnly className="setting__input" placeholder="Пол" /></div>
                        <div className="setting__item"><Input value={getNormalDate(birthdate)} readOnly className="setting__input" placeholder="Дата рождения" /></div>
                    </>}
                </div>
            </div>

            {verified !== VERIFY_STATUS.NOT_VERIFIED && <div className="setting__block">
                <h4 className="setting__title">Паспортные данные</h4>

                <div className="setting__items">
                    <div className="setting__item"><Input value={`${passportSer} ${passportNum}`} readOnly className="setting__input" placeholder="Серия и номер паспорта" /></div>
                    <div className="setting__item"><Input value={granted} readOnly className="setting__input" placeholder="Кем выдан" /></div>
                    <div className="setting__item"><Input value={getNormalDate(grantedDate)} readOnly className="setting__input" placeholder="Дата выдачи" /></div>
                </div>
            </div>}
        </>
    )
}

export default DataTab;