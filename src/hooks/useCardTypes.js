import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { REQUEST_STATUSES } from '../consts/REQUEST_STATUSES';
import useRequest from './useRequest';
import { REQUEST_TYPE, HTTP_METHODS } from '../consts/HTTP';

import { initCardTypes } from '../redux/slices/cardTypes';

const useCardTypes = () => {
    const [error, setError] = React.useState(false);
    const [isLoad, setIsLoad] = React.useState(false);

    const {cardTypes} = useSelector(state => state.cardTypes);
    const dispatch = useDispatch();
    const {request} = useRequest();

    const getCardTypes = async (page = 0, limit = 10) => {
        setIsLoad(true);

        if(Object.keys(cardTypes).length === 0 || cardTypes.number !== page || cardTypes.size !== limit){
            const data = await request(REQUEST_TYPE.CARD, `/types?offset=${page}&limit=${limit}`, HTTP_METHODS.GET);

            if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL){
                setError(true);
            }
            else{
                dispatch(initCardTypes(data));
            }
        }

        setIsLoad(false);
    };

    return {isLoad, error, getCardTypes}
}

export default useCardTypes;