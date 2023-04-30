import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
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
        default:
            return <CircleCross className="verify__not" />
    }
}

const UserBlock = ({data, id}) => {
    const {id: userId, dataUsers, verify, phoneNum, cards, accountNum, roles} = data;

    const {verifyUser, blockUser, unblockUser, rejectUserVerify, addRole, removeRole} = useAdmin();

    const verifyUserHandler = () => {
        verifyUser(userId);
    }

    const rejectVerifyUserHandler = () => {
        rejectUserVerify(userId);
    }

    const getAdmin = () => {
        addRole(userId, 2);
    }

    const removeAdmin = () => {
        removeRole(userId, 2);
    }

    return (
        <AdminItem id={id + 1} title={`${dataUsers?.secondName || "-"} ${dataUsers?.firstName || "-"} ${dataUsers?.middleName || "-"}`}>
            <DataItem title="Данные" icon={<Data />}>
                <div className="section-admin__items">
                    <DataField title="Номер телефона" value={maskPhone(phoneNum)} />
                    <DataField title="Номер счета" value={accountNum || "-"} />
                    <DataField title="Роли пользователя" value={roles.join(", ") || "-"} big />
                </div>
            </DataItem>

            <DataItem title="Верификация" icon={getVerifyIcon(verify)}>
                {(verify === VERIFY_STATUS.VERIFIED || verify === VERIFY_STATUS.PROCESS) && <div className="section-admin__items">
                    <DataField title="Пол" value={dataUsers?.sex ? "Мужской" : "Женский"} />
                    <DataField title="День рождения" value={getNormalDate(dataUsers?.birthdate)} />
                    <DataField title="Серия и номер паспорта" value={`${dataUsers?.passportSer || "-"} ${dataUsers?.passportNum || "-"}`} />
                    <DataField title="Дата выдачи" value={getNormalDate(dataUsers?.grantedDate)} />
                    <DataField title="Кем выдан" value={dataUsers?.granted || "-"} big />
                </div>}

                {verify === VERIFY_STATUS.PROCESS && <div className="admin__verify--buttons">
                    <Button onClick={verifyUserHandler} className="admin__btn admin__verify--button">Верифицировать</Button>
                    <Button onClick={rejectVerifyUserHandler} className="admin__btn admin__verify--button red-btn">Отклонить</Button>
                </div>}
                {(verify === VERIFY_STATUS.NOT_VERIFIED || verify === VERIFY_STATUS.REFUSED) && <EmptyBlock title="Пользователь не верифицирован" />}
            </DataItem>

            <DataItem title="Карты" icon={<Card />}>
                <Swiper
                    className="swiper__inner"
                    spaceBetween={10}
                    freeMode={true}
                    modules={[FreeMode]}
                    breakpoints={{
                        0: {
                            slidesPerView: 1.1
                        },
                        360: {
                            slidesPerView: 1.3
                        },
                        530: {
                            slidesPerView: 2.1
                        },
                        660: {
                            slidesPerView: 2.5
                        },
                        769: {
                            slidesPerView: 1.5
                        },
                        900: {
                            slidesPerView: 2.2
                        },
                        1150: {
                            slidesPerView: 2.75
                        },
                    }}
                >
                
                    {cards.length
                    ? cards.map((data, id) => <SwiperSlide key={id}>
                        <CardItem userId={userId} data={data} />
                    </SwiperSlide>)
                    : <EmptyBlock title="Карт нет" />}
                </Swiper>
            </DataItem>

            <DataItem title="Действия" icon={<Actions />}>
                {roles.includes("blocked")
                ? <p className="section-admin__text-btn" onClick={() => unblockUser(userId)}>Разблокировать</p>
                : <p className="section-admin__text-btn" onClick={() => blockUser(userId)}>Заблокировать</p>}

                {roles.includes("admin")
                ? <p className="section-admin__text-btn" onClick={removeAdmin}>Забрать администратора</p>
                : <p className="section-admin__text-btn" onClick={getAdmin}>Выдать администратора</p>}
            </DataItem>
        </AdminItem>
    )
}

export default UserBlock;