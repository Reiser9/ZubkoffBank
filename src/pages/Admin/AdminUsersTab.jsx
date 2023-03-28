import React from 'react';

import './index.css';

import UserBlock from './UserBlock';

const AdminUsersTab = () => {
    return (
        <>
            <div className="admin__header admin__header_users">
                <h2 className="admin__title">Пользователи (<span>2</span>)</h2>

                <div className="limit">
                    <p className="limit__label">Показывать по:</p>

                    <div className="number__btns">
                        <div className="number__btn active">5</div>

                        <div className="number__btn">10</div>

                        <div className="number__btn">20</div>
                    </div>
                </div>
            </div>

            <div className="admin__items">
                <UserBlock data={{
                    id: 1,
                    phoneNum: "+79923074831",
                    accountNum: "6162370",
                    verify: "NOT VERIFIED",
                    roles: [
                        {
                            id: 1,
                            role: "user"
                        },
                        {
                            id: 2,
                            role: "admin"
                        }
                    ],
                    cards: [],
                    dataUsers: {
                        id: 1,
                        firstName: "Егор",
                        secondName: "Зубков",
                        middleName: "Амирханович",
                        passportNum: "123456",
                        passportSer: "5435",
                        grantedDate: "2018-03-26T20:20:57.727+00:00",
                        granted: "УФМС г. Тюмень",
                        birthdate: "2002-03-26T20:20:57.727+00:00",
                        sex: true,
                        userId: 1
                    }
                }} />
            </div>

            <div className="number__btns pagination">
                <div className="number__btn active">1</div>

                <div className="number__btn">2</div>

                <div className="number__btn">3</div>
            </div>
        </>
    )
}

export default AdminUsersTab;