import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useRequest, { REQUEST_TYPE, HTTP_METHODS } from './useRequest';

import { initCardTypes } from '../redux/slices/cardTypes';

const useCardTypes = () => {
    const [error, setError] = React.useState(false);
    const [isLoad, setIsLoad] = React.useState(false);

    const {cardTypes} = useSelector(state => state.cardTypes);
    const dispatch = useDispatch();
    const {request} = useRequest();

    const getCardTypes = async () => {
        setIsLoad(true);

        if(Object.keys(cardTypes).length === 0){
            const data = await request(REQUEST_TYPE.CARD, "/types", HTTP_METHODS.GET);

            if(!data){
                setError(true);
            }
            else{
                dispatch(initCardTypes(data));
            }
        }

        setIsLoad(false);
    };

    React.useEffect(() => {
        getCardTypes();
    }, []);

    return {isLoad, error, getCardTypes}
}

export default useCardTypes;