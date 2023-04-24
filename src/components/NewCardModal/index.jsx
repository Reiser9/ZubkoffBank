import React from 'react';
import { useSelector } from 'react-redux';

import './index.css';

import useCardTypes from '../../hooks/useCardTypes';
import useUser from '../../hooks/useUser';

import Modal from '../Modal';
import Preloader from '../Preloader';
import CardShortBlock from '../CardShortBlock';
import EmptyBlock from '../EmptyBlock';

const NewCardModal = ({active, setActive}) => {
    const {error, isLoad, getCardTypes} = useCardTypes();
    const {getUserFullInfo} = useUser();
    const {cardTypes} = useSelector(state => state.cardTypes);

    React.useEffect(() => {
        getUserFullInfo();
        getCardTypes();
    }, []);

    return (
        <Modal active={active} setActive={setActive}>
            <div className="cards-popup__items">
                {isLoad
                    ? <Preloader />
                    : !error
                    ? cardTypes.content?.length ? cardTypes.content.map((data, id) => <CardShortBlock key={id} data={data} setActive={setActive} />)
                    : <EmptyBlock title="Карт нет" />
                    : <EmptyBlock title="Возникла ошибка" />}
            </div>
        </Modal>
    )
}

export default NewCardModal;