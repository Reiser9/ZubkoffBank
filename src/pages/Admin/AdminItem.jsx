import React from 'react';

import './index.css';

import {VERIFY_STATUS} from '../../consts/VERIFY_STATUS';

import {getNormalDate} from '../../utils/getNormalDate';
import { maskPhone } from '../../utils/maskPhone';

import { Actions, Arrow, Card, Data, NotifyOkIcon, NotifyWarningIcon, CircleCross } from '../../components/Icons';

import Button from '../../components/Button';
import DataItem from './DataItem';
import DataField from './DataField';
import CardItem from './CardItem';

const getVerifyIcon = (verifyStatus) => {
    switch (verifyStatus) {
        case VERIFY_STATUS.VERIFIED:
            return <NotifyOkIcon className="verify__success" />
        case VERIFY_STATUS.PROCESSING:
            return <NotifyWarningIcon className="verify__process" />
        case VERIFY_STATUS.NOT_VERIFIED:
            return <CircleCross className="verify__not" />
        default:
            break;
    }
}

const AdminItem = ({data}) => {
    const [active, setActive] = React.useState(false);

    const {dataUsers, verify, phoneNum, cards, accountNum} = data;
    const {id, firstName, secondName, middleName, birthdate, sex, granted, grantedDate, passportNum, passportSer} = dataUsers;

    return (
        <div className={`item-admin${active ? " active" : ""}`}>
            <div className="item-admin__header" onClick={() => setActive(prev => !prev)}>
                <div className="item-admin__title">
                    <div className="item-admin__number">{id}</div>

                    <p className="item-admin__name">{`${secondName} ${firstName} ${middleName}`}</p>
                </div>

                <div className="item-admin__open-btn">
                    <Arrow className="item-admin__arrow" />
                </div>
            </div>

            <div className="item-admin__content">
                <DataItem title="Данные" icon={<Data />}>
                    <div className="section-admin__items">
                        <DataField title="Номер телефона" value={maskPhone(phoneNum)} />
                        <DataField title="Пол" value={sex ? "Мужской" : "Женский"} />
                        <DataField title="День рождения" value={getNormalDate(birthdate)} />
                        <DataField title="Номер счета" value={accountNum} />
                    </div>
                </DataItem>

                <DataItem title="Верификация" icon={getVerifyIcon(verify)}>
                    {verify === VERIFY_STATUS.VERIFIED || verify === VERIFY_STATUS.PROCESSING && <div className="section-admin__items">
                        <DataField title="Серия и номер паспорта" value={`${passportSer} ${passportNum}`} />
                        <DataField title="Дата выдачи" value={getNormalDate(grantedDate)} />
                        <DataField title="Кем выдан" value={granted} big />
                    </div>}

                    {verify === VERIFY_STATUS.PROCESSING && <Button className="admin__btn">Верифицировать</Button>}

                    {verify === VERIFY_STATUS.NOT_VERIFIED && <p className="section-admin__text">Пользователь не верифицирован</p>}
                </DataItem>

                <DataItem title="Карты" icon={<Card />}>
                    <div className="section-admin__items">
                        {cards.length > 0 ? cards.map((data, id) => <CardItem key={id} data={data} />) : <div>Карт нет</div>}
                    </div>
                </DataItem>

                <DataItem title="Действия" icon={<Actions />}>
                    <p className="section-admin__text-btn">Заблокировать</p>
                </DataItem>
            </div>
        </div>
    )
}

export default AdminItem;