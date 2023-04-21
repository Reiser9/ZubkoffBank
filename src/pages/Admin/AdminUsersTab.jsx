import React from 'react';
import { useSelector } from 'react-redux';

import './index.css';

import useAdmin from '../../hooks/useAdmin';
import useCardTypes from '../../hooks/useCardTypes';

import UserBlock from './UserBlock';
import Preloader from '../../components/Preloader';
import EmptyBlock from '../../components/EmptyBlock';
import Paggination from '../../components/Paggination';
import ShowBy from '../../components/ShowBy';

const AdminUsersTab = () => {
    const {isLoad, error, getUsers} = useAdmin();
    const {isLoad: isLoadCardTypes, error: errorCardTypes} = useCardTypes();

    const {users} = useSelector(state => state.admin);
    const {content, totalPages, totalElements, number, size} = users;

    React.useEffect(() => {
        getUsers();
    }, []);

    if(isLoad || isLoadCardTypes){
        return <Preloader />
    }

    return (
        <>
            <div className="admin__header admin__header_users">
                <h2 className="admin__title">Пользователи: {totalElements && totalElements}</h2>

                <ShowBy page={number} size={size} />
            </div>

            <div className="admin__items">
                {error || errorCardTypes
                ? <EmptyBlock title="Возникла какая-то ошибка" center />
                : (content?.length ? content.map((data, id) => <UserBlock key={data.id} id={(number * size) + id} data={data} />)
                : <EmptyBlock title="Пользователей нет" center />)}
            </div>

            <Paggination totalPages={totalPages} page={number} size={size} />
        </>
    )
}

export default AdminUsersTab;