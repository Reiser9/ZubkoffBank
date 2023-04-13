import React from 'react';

import './index.css';

import {VERIFY_STATUS} from '../../consts/VERIFY_STATUS';

import {getNormalDate} from '../../utils/getNormalDate';
import { maskPhone } from '../../utils/maskPhone';
import useAdmin from '../../hooks/useAdmin';

import { Actions, Card, Data, NotifyOkIcon, NotifyWarningIcon, CircleCross } from '../../components/Icons';

import Button from '../../components/Button';
import AdminItem from './AdminItem';
import DataItem from './DataItem';
import DataField from './DataField';
import CardItem from './CardItem';
import EmptyBlock from '../../components/EmptyBlock';

const getVerifyIcon = (verifyStatus) => {
    switch (verifyStatus) {
        case VERIFY_STATUS.VERIFIED:
            return <NotifyOkIcon className="verify__success" />
        case VERIFY_STATUS.PROCESS:
            return <NotifyWarningIcon className="verify__process" />
        case VERIFY_STATUS.NOT_VERIFIED:
            return <CircleCross className="verify__not" />
        default:
            break;
    }
}

const UserBlock = ({data, id}) => {
    const {id: userId, dataUsers, verify, phoneNum, cards, accountNum, roles} = data;
    const {firstName, secondName, middleName, birthdate, sex, granted, grantedDate, passportNum, passportSer} = dataUsers;

    const {verifyUser, blockUser, unblockUser} = useAdmin();

    const verifyUserHandler = () => {
        verifyUser(userId);
    }

    return (
        <AdminItem id={id + 1} title={`${secondName} ${firstName} ${middleName}`}>
            <DataItem title="Данные" icon={<Data />}>
                <div className="section-admin__items">
                    <DataField title="Номер телефона" value={maskPhone(phoneNum)} />
                    <DataField title="Номер счета" value={accountNum} />
                    <DataField title="Роли пользователя" value={roles.join(", ")} big />
                </div>
            </DataItem>

            <DataItem title="Верификация" icon={getVerifyIcon(verify)}>
                {(verify === VERIFY_STATUS.VERIFIED || verify === VERIFY_STATUS.PROCESS) && <div className="section-admin__items">
                    <DataField title="Пол" value={sex ? "Мужской" : "Женский"} />
                    <DataField title="День рождения" value={getNormalDate(birthdate)} />
                    <DataField title="Серия и номер паспорта" value={`${passportSer} ${passportNum}`} />
                    <DataField title="Дата выдачи" value={getNormalDate(grantedDate)} />
                    <DataField title="Кем выдан" value={granted} big />
                </div>}

                {verify === VERIFY_STATUS.PROCESS && <Button onClick={verifyUserHandler} className="admin__btn">Верифицировать</Button>}
                {verify === VERIFY_STATUS.NOT_VERIFIED && <EmptyBlock title="Пользователь не верифицирован" />}
            </DataItem>

            <DataItem title="Карты" icon={<Card />}>
                <div className="section-admin__items">
                    {cards.length ? cards.map((data, id) => <CardItem key={id} userId={userId} data={data} />) : <EmptyBlock title="Карт нет" />}
                </div>
            </DataItem>

            <DataItem title="Действия" icon={<Actions />}>
                {roles.includes("blocked")
                ? <p className="section-admin__text-btn" onClick={() => unblockUser(userId)}>Разблокировать</p>
                : <p className="section-admin__text-btn" onClick={() => blockUser(userId)}>Заблокировать</p>}
            </DataItem>
        </AdminItem>
    )
}

export default UserBlock;