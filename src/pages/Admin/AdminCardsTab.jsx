import React from 'react';

import './index.css';

import { Add,  } from '../../components/Icons';
import Button from '../../components/Button';
import CardBlock from './CardBlock';
import useCardTypes from '../../hooks/useCardTypes';
import Preloader from '../../components/Preloader';

const AdminCardsTab = () => {
    const {isLoad, error, cardTypes} = useCardTypes();

    const {content, totalPages, totalElements} = cardTypes;

    console.log(cardTypes.content?.length);

    if(isLoad){
        return <Preloader />
    }

    return (
        <>
            <div className="admin__header admin__header_cards">
                <h2 className="admin__title">Типы карт (<span>{totalElements}</span>)</h2>

                <Button className="admin__btn">
                    <Add className="admin__icon" />

                    Добавить тип
                </Button>
            </div>

            <div className="admin__items">
                {!error
                ? cardTypes.content?.length > 0 ? cardTypes.content.map((data, id) => <CardBlock key={id} id={id} data={data} />)
                : <div>Карт нет</div>
                : <div>Ошибка</div>}
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