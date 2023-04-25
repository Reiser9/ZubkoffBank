import React from 'react';
import { useSelector } from 'react-redux';

import './index.css';

import { PAGGINATION_DATA } from '../../consts/PAGGINATION_DATA';
import useAdmin from '../../hooks/useAdmin';
import useCardTypes from '../../hooks/useCardTypes';

import UserBlock from './UserBlock';
import Preloader from '../../components/Preloader';
import EmptyBlock from '../../components/EmptyBlock';
import Paggination from '../../components/Paggination';
import ShowBy from '../../components/ShowBy';

const AdminUsersTab = () => {
    const {isLoad, error, getUsers} = useAdmin();
    const {isLoad: isLoadCardTypes, error: errorCardTypes, getCardTypes} = useCardTypes();

    const {usersPagin} = useSelector(state => state.admin);
    const {content, totalPages, totalElements, page, size} = usersPagin;

    React.useEffect(() => {
        getUsers();
        getCardTypes();
    }, []);

    if(isLoad || isLoadCardTypes){
        return <Preloader />
    }

    return (
        <>
            <div className="admin__header admin__header_users">
                {totalElements && <h2 className="admin__title">Пользователи: {totalElements}</h2>}

                <ShowBy page={page} size={size} data={PAGGINATION_DATA.USERS} />
            </div>

            <div className="admin__items">
                {error || errorCardTypes
                ? <EmptyBlock title="Возникла какая-то ошибка" center />
                : (content?.length ? content.map((data, id) => <UserBlock key={data.id} id={(page * size) + id} data={data} />)
                : <EmptyBlock title="Пользователей нет" center />)}
            </div>

            <Paggination totalPages={totalPages} page={page} size={size} data={PAGGINATION_DATA.USERS} />
        </>
    )
}

export default AdminUsersTab;