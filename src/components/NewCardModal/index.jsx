import React from 'react';

import './index.css';

import useCardTypes from '../../hooks/useCardTypes';

import Modal from '../Modal';
import Preloader from '../Preloader';
import CardShortBlock from '../CardShortBlock';

const NewCardModal = ({active, setActive}) => {
    const {error, isLoad, cardTypes} = useCardTypes();

    return (
        <Modal active={active} setActive={setActive}>
            <div className="cards-popup__items">
                {isLoad
                    ? <Preloader />
                    : !error
                    ? cardTypes.content?.length > 0 ? cardTypes.content.map((data, id) => <CardShortBlock key={id} img={data.img} />)
                    : <div>Карт нет</div>
                    : <div>Ошибка</div>}
            </div>
        </Modal>
    )
}

export default NewCardModal;