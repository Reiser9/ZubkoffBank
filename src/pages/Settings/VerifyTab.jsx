import React from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import './index.css';

import {INPUT_MASK_TYPE} from '../../consts/INPUT_MASK_TYPE';

import useUser from '../../hooks/useUser';
import {getNormalDate} from '../../utils/getNormalDate';

import Input from '../../components/Input';
import Button from '../../components/Button';
import VerifyStage from './VerifyStage';
import Preloader from '../../components/Preloader';
import Choice from '../../components/Choice';
import { VERIFY_STATUS } from '../../consts/VERIFY_STATUS';

const VerifyTab = () => {
    const {user, userIsLoading} = useSelector(state => state.user);
    const {sendVerifyRequest, getUserFullInfo} = useUser();

    const [passportData, setPassportData] = React.useState("");
    const [granted, setGranted] = React.useState("");
    const [grantedDate, setGrantedDate] = React.useState(user.verified === VERIFY_STATUS.REFUSED ? dayjs() : "");
    const [birthdate, setBirthdate] = React.useState(user.verified === VERIFY_STATUS.REFUSED ? dayjs() : "");
    const [sex, setSex] = React.useState(true);

    const verify = () => {
        sendVerifyRequest(passportData, granted, grantedDate, birthdate, sex);
    }

    React.useEffect(() => {
        getUserFullInfo();
    }, []);

    React.useEffect(() => {
        if(user.verified === VERIFY_STATUS.REFUSED && user.secondName){
            setPassportData(`${user.passportSer} ${user.passportNum}`);
            setGranted(user.granted);
            setGrantedDate(dayjs(user.grantedDate));
            setBirthdate(dayjs(user.birthdate));
            setSex(user.sex);
        }
    }, [user]);

    if(userIsLoading){
        return <Preloader />
    }

    return (
        <>
            {(user.verified === VERIFY_STATUS.NOT_VERIFIED || user.verified === VERIFY_STATUS.REFUSED) && <>
                <div className="setting__block">
                    {user.verified === VERIFY_STATUS.REFUSED && <p className="red center w100 medium">Заявка на верификацию отклонена, попробуйте еще раз</p>}

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

            {user.verified === VERIFY_STATUS.PROCESS && <VerifyStage icon="clock" text="Данные на этапе проверки, пожалуйста, ожидайте" />}
            {user.verified === VERIFY_STATUS.VERIFIED && <VerifyStage icon="check" text="Верификация успешно пройдена" />}
        </>
    )
}

export default VerifyTab;