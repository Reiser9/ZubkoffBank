import React from 'react';

import './index.css';

import PagginationItem from './PagginationItem';
import usePaggination from '../../hooks/usePaggination';

const Paggination = ({totalPages, page, size}) => {
    const {isLoad, changePagginationUsers} = usePaggination();

    if(totalPages < 2){
        return;
    }

    return (
        <div className={`number__btns pagination${isLoad ? " disabled" : ""}`}>
            {[...Array(totalPages)].map((_, id) => <PagginationItem key={id} number={id + 1} active={id === page} onClick={() => changePagginationUsers(id, size)} />)}
        </div>
    )
}

export default Paggination;