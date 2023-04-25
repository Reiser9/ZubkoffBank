import React from 'react';
import { useSelector } from 'react-redux';

import './index.css';

import { PAGGINATION_DATA } from '../../consts/PAGGINATION_DATA';
import { Add } from '../../components/Icons';
import Button from '../../components/Button';
import CardBlock from './CardBlock';
import Preloader from '../../components/Preloader';
import EmptyBlock from '../../components/EmptyBlock';
import Paggination from '../../components/Paggination';
import useAdmin from '../../hooks/useAdmin';

const AdminCardsTab = ({setActive}) => {
    const {isLoad, error, getCardTypes} = useAdmin();
    const {cardTypesPagin} = useSelector(state => state.admin);

    const {content, totalPages, totalElements, page, size} = cardTypesPagin;

    React.useEffect(() => {
        getCardTypes();
    }, []);

    if(isLoad){
        return <Preloader />
    }

    return (
        <>
            <div className="admin__header">
                {totalElements && <h2 className="admin__title">Типы карт: {totalElements}</h2>}

                <Button className="admin__btn" onClick={() => setActive("createType")}>
                    <Add className="admin__icon" />

                    <span>Добавить</span>
                </Button>
            </div>

            <div className="admin__items">
                {!error
                ? content?.length ? content.map((data, id) => <CardBlock key={id} id={(page * size) + id} data={data} />)
                : <EmptyBlock title="Карт нет" center />
                : <EmptyBlock title="Возникла какая-то ошибка" center />}
            </div>

            <Paggination totalPages={totalPages} page={page} size={size} data={PAGGINATION_DATA.CARD_TYPES} />
        </>
    )
}

export default AdminCardsTab;