import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useRequest, { REQUEST_TYPE, HTTP_METHODS } from './useRequest';

import { initCardTypes } from '../redux/slices/cardTypes';

const useCardTypes = () => {
    const [cardTypes, setCardTypes] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [isLoad, setIsLoad] = React.useState(false);

    const cardTypesData = useSelector(state => state.cardTypes);
    const dispatch = useDispatch();
    const {request, error: requestError} = useRequest();

    const getCardTypes = React.useCallback(async () => {
        setIsLoad(true);

        if(Object.keys(cardTypesData.cardTypes).length !== 0){
            setCardTypes(cardTypesData.cardTypes);
        }
        else{
            const data = await request(REQUEST_TYPE.CARD, "/types", HTTP_METHODS.GET);

            if(!data){
                console.log(requestError);
                setError(true);
            }
            else{
                dispatch(initCardTypes(data));
                setCardTypes(data);
            }
        }

        setIsLoad(false);
    }, [requestError, cardTypesData.cardTypes, dispatch, request]);

    React.useEffect(() => {
        getCardTypes();
    }, [getCardTypes]);

    return {isLoad, error, cardTypes}
}

export default useCardTypes;