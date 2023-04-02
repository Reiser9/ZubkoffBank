import React from 'react';

import './index.css';

import useAdmin from '../../hooks/useAdmin';

import UserBlock from './UserBlock';
import Preloader from '../../components/Preloader';
import { useSelector } from 'react-redux';

const AdminUsersTab = () => {
    const {isLoad, error, getUsers} = useAdmin();

    const {users} = useSelector(state => state.admin);
    const {content, totalPages, totalElements} = users;

    React.useEffect(() => {
        getUsers();
    }, []);

    if(isLoad){
        return <Preloader />
    }

    return (
        <>
            <div className="admin__header admin__header_users">
                <h2 className="admin__title">Пользователи (<span>{totalElements}</span>)</h2>

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
                {!error
                ? content?.length > 0 ? content.map((data, id) => <UserBlock key={id} id={id} data={data} />)
                : <div>Пользователей нет</div>
                : <div>Ошибка</div>}
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