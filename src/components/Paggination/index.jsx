import React from 'react';

import './index.css';

import PagginationItem from './PagginationItem';
import usePaggination from '../../hooks/usePaggination';
import { ArrowLeft, ArrowRight } from '../Icons';

const Paggination = ({totalPages = 1, page, size, data, delta = 1, separator = "..."}) => {
    const [pagginationElements, setPagginationElements] = React.useState([]);

    const {isLoad, paggination} = usePaggination();

    React.useEffect(() => {
        let currentElements = [];

        let left = page - delta;
        let right = page + delta;

        if(page === 0){
            right += 1;
        }
        else if(page === totalPages - 1){
            left -= 1;
        }

        for(let i = 0; i < totalPages; i++){
            if(i === 0 || i === totalPages - 1 || (i >= left && i <= right)){
                currentElements = [...currentElements, i];
            }
        }

        if(page + 1 >= delta + 3){
            currentElements.splice(1, 0, separator);
        }

        if(page + 1 <= totalPages - delta - 2){
            currentElements.splice(-1, 0, separator);
        }

        setPagginationElements(currentElements);
    }, [page, totalPages]);

    if(totalPages < 2 || !pagginationElements.length){
        return;
    }

    return (
        <div className={`number__btns pagination${isLoad ? " disabled" : ""}`}>
            <PagginationItem disabled={page === 0} active={false} onClick={() => paggination(page - 1, size, data)}>
                <ArrowLeft />
            </PagginationItem>

            {pagginationElements.map((number, id) => <PagginationItem
                disabled={number === separator}
                dots={number === separator}
                key={id}
                number={number === separator ? number : number + 1}
                active={number === page}
                onClick={() => paggination(number, size, data)}
            />)}

            <PagginationItem disabled={page === totalPages - 1} active={false} onClick={() => paggination(page + 1, size, data)}>
                <ArrowRight />
            </PagginationItem>
        </div>
    )
}

export default Paggination;
