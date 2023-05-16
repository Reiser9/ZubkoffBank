import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';
import useRequest from './useRequest';
import { requestDataIsError } from '../utils/requestDataIsError';
import {initSubscribes} from '../redux/slices/subscribes';

const useSubscribes = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const {request} = useRequest();
    const dispatch = useDispatch();
    const {subscribes} = useSelector(state => state.subscribes);

    const getSubscribes = async () => {
        setError(false);
        setIsLoading(true);

        if(!subscribes.length){
            const data = await request(REQUEST_TYPE.EMPTY, "/subscribes", HTTP_METHODS.GET);

            if(requestDataIsError(data)){
                setError(true);
            }
            else{
                dispatch(initSubscribes(data));
            }
        }

        setIsLoading(false);
    }

    return {
        isLoading,
        error,
        getSubscribes
    };
}

export default useSubscribes;