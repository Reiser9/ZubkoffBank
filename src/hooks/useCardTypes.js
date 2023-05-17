import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useRequest from './useRequest';
import { REQUEST_TYPE, HTTP_METHODS } from '../consts/HTTP';

import { initCardTypes } from '../redux/slices/cardTypes';
import { requestDataIsError } from '../utils/requestDataIsError';

const useCardTypes = () => {
    const [error, setError] = React.useState(false);
    const [isLoad, setIsLoad] = React.useState(false);

    const {cardTypes} = useSelector(state => state.cardTypes);
    const dispatch = useDispatch();
    const {request} = useRequest();

    const getCardTypes = async (page = 0, limit = 10) => {
        setError(false);
        setIsLoad(true);

        if(Object.keys(cardTypes).length === 0 || cardTypes.number !== page || cardTypes.size !== limit){
            const data = await request(REQUEST_TYPE.CARD, `/types?offset=${page}&limit=${limit}`, HTTP_METHODS.GET);

            if(requestDataIsError(data)){
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