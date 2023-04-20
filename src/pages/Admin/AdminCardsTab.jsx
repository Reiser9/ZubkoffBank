import React from 'react';
import { useSelector } from 'react-redux';

import './index.css';

import { Add } from '../../components/Icons';
import Button from '../../components/Button';
import CardBlock from './CardBlock';
import useCardTypes from '../../hooks/useCardTypes';
import Preloader from '../../components/Preloader';
import EmptyBlock from '../../components/EmptyBlock';

const AdminCardsTab = ({setActive}) => {
    const {isLoad, error} = useCardTypes();
    const {cardTypes} = useSelector(state => state.cardTypes);

    const {content, totalPages, totalElements} = cardTypes;

    if(isLoad){
        return <Preloader />
    }

    return (
        <>
            <div className="admin__header">
                <h2 className="admin__title">Типы карт {totalElements && `(${totalElements})`}</h2>

                <Button className="admin__btn" onClick={() => setActive("createType")}>
                    <Add className="admin__icon" />

                    <span>Добавить</span>
                </Button>
            </div>

            <div className="admin__items">
                {!error
                ? content?.length ? content.map((data, id) => <CardBlock key={id} id={id} data={data} />)
                : <EmptyBlock title="Карт нет" center />
                : <EmptyBlock title="Возникла какая-то ошибка" center />}
            </div>

            {totalPages > 1 &&<div className="number__btns pagination">
                <div className="number__btn active">1</div>

                <div className="number__btn">2</div>
                
                <div className="number__btn">3</div>
            </div>}
        </>
    )
}

export default AdminCardsTab;