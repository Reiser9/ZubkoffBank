import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useRequest, { REQUEST_TYPE, HTTP_METHODS } from './useRequest';

import { setUser, setUserIsLoading } from '../redux/slices/user';

const useUser = () => {
    const dispatch = useDispatch();
    const {request} = useRequest();
    const {user, userIsLoading} = useSelector(state => state.user);

    const getUserShortInfo = async () => {
        dispatch(setUserIsLoading(true));

        const data = await request(REQUEST_TYPE.USER, "/short_info", HTTP_METHODS.GET, true);

        dispatch(setUser(data));
        dispatch(setUserIsLoading(false));

        return data;
    }

    const getUserFullInfo = async () => {
        dispatch(setUserIsLoading(true));

        if(!user.secondName){
            const data = await request(REQUEST_TYPE.USER, "/full_info", HTTP_METHODS.GET, true);

            dispatch(setUser(data));
        }
        
        dispatch(setUserIsLoading(false));
    };

    return {user, userIsLoading, getUserShortInfo, getUserFullInfo}
}

export default useUser;