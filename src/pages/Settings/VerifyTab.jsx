import React from 'react';
import { useSelector } from 'react-redux';

import './index.css';

import {INPUT_MASK_TYPE} from '../../consts/INPUT_MASK_TYPE';

import useUser from '../../hooks/useUser';

import Input from '../../components/Input';
import Button from '../../components/Button';
import VerifyStage from './VerifyStage';
import Preloader from '../../components/Preloader';
import Choice from '../../components/Choice';

const VerifyTab = () => {
    const [passportData, setPassportData] = React.useState("");
    const [granted, setGranted] = React.useState("");
    const [grantedDate, setGrantedDate] = React.useState("");
    const [birthdate, setBirthdate] = React.useState("");
    const [sex, setSex] = React.useState(true);

    const {user, userIsLoading} = useSelector(state => state.user);
    const {sendVerifyRequest} = useUser();

    const verify = () => {
        sendVerifyRequest(passportData, granted, grantedDate, birthdate, sex);
    }

    if(userIsLoading){
        return <Preloader />
    }

    return (
        <>
            {user.verified === "NOT VERIFIED" && <>
                <div className="setting__block">
                    <h4 className="setting__title">Информация</h4>

                    <div className="setting__items">
                        <div className="setting__item">
                            <Input title="Серия и номер паспорта" mask={INPUT_MASK_TYPE.PASSPORT_DATA} className="setting__input" value={passportData} setValue={setPassportData} />
                        </div>

                        <div className="setting__item">
                            <Input title="Кем выдан" className="setting__input" value={granted} setValue={setGranted} />
                        </div>

                        <div className="setting__item">
                            <Input title="Дата выдачи" className="setting__input" value={grantedDate} setValue={setGrantedDate} date />
                        </div>

                        <div className="setting__item">
                            <Input title="Дата рождения" className="setting__input" value={birthdate} setValue={setBirthdate} date />
                        </div>

                        <div className="setting__item">
                            <Choice value={sex} setValue={setSex} text1="Мужской" text2="Женский" title="Пол" />
                        </div>
                    </div>
                </div>

                <Button className="setting__verify-btn" onClick={verify}>Верифицировать</Button>
            </>}

            {user.verified === "PROCESS" && <VerifyStage icon="clock" text="Данные на этапе проверки, пожалуйста, ожидайте" />}
            {user.verified === "VERIFIED" && <VerifyStage icon="check" text="Верификация успешно пройдена" />}
        </>
    )
}

export default VerifyTab;