import React from 'react';

import '../Paggination/index.css';
import './index.css';

import usePaggination from '../../hooks/usePaggination';

import PagginationItem from '../Paggination/PagginationItem';

const ShowBy = ({page, size, title = "Показывать по:", data}) => {
    const {isLoad, paggination} = usePaggination();

    return (
        <div className="limit">
            <p className="limit__label">{title}</p>

            <div className={`number__btns${isLoad ? " disabled" : ""}`}>
                <PagginationItem number="5" active={size === 5} onClick={() => paggination(page, 5, data)} />

                <PagginationItem number="10" active={size === 10} onClick={() => paggination(page, 10, data)} />

                <PagginationItem number="20" active={size === 20} onClick={() => paggination(page, 20, data)} />
            </div>
        </div>
    )
}

export default ShowBy;