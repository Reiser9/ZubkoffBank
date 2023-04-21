import React from 'react';

import '../Paggination/index.css';
import './index.css';

import usePaggination from '../../hooks/usePaggination';

import PagginationItem from '../Paggination/PagginationItem';

const ShowBy = ({page, size, title = "Показывать по:"}) => {
    const {isLoad, changeLimitUsers} = usePaggination();

    return (
        <div className="limit">
            <p className="limit__label">{title}</p>

            <div className={`number__btns${isLoad ? " disabled" : ""}`}>
                <PagginationItem number="5" active={size === 5} onClick={() => changeLimitUsers(page, 5)} />

                <PagginationItem number="10" active={size === 10} onClick={() => changeLimitUsers(page, 10)} />

                <PagginationItem number="20" active={size === 20} onClick={() => changeLimitUsers(page, 20)} />
            </div>
        </div>
    )
}

export default ShowBy;