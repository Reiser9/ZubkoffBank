import React from 'react';
import { useSelector } from 'react-redux';

import './index.css';

import useAdmin from '../../hooks/useAdmin';
import useCardTypes from '../../hooks/useCardTypes';

import UserBlock from './UserBlock';
import Preloader from '../../components/Preloader';
import EmptyBlock from '../../components/EmptyBlock';

const AdminUsersTab = () => {
    const {isLoad, error, getUsers} = useAdmin();
    const {isLoad: isLoadCardTypes, error: errorCardTypes} = useCardTypes();

    const {users} = useSelector(state => state.admin);
    const {content, totalPages, totalElements} = users;

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
                {error || errorCardTypes
                ? <EmptyBlock title="Возникла какая-то ошибка" center />
                : (content?.length ? content.map((data, id) => <UserBlock key={data.id} id={id} data={data} />)
                : <EmptyBlock title="Пользователей нет" center />)}
            </div>

            {totalPages > 1 && <div className="number__btns pagination">
                <div className="number__btn active">1</div>

                <div className="number__btn">2</div>

                <div className="number__btn">3</div>
            </div>}
        </>
    )
}

export default AdminUsersTab;