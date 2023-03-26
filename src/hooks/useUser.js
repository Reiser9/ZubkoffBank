import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useRequest, { REQUEST_TYPE, HTTP_METHODS } from './useRequest';

import { setUser, setUserIsLoading } from '../redux/slices/user';

const useUser = () => {
    const dispatch = useDispatch();
    const {request} = useRequest();
    const {user} = useSelector(state => state.user);

    const getUserFullInfo = React.useCallback(async () => {
        dispatch(setUserIsLoading(true));

        if(Object.keys(user).length !== 0){
            console.log(user);
            setUser(user);
        }
        else{
            const data = await request(REQUEST_TYPE.USER, "/full_info", HTTP_METHODS.GET, true);

            dispatch(setUser(data));
        }
        
        dispatch(setUserIsLoading(false));
    }, [dispatch, user]);

    React.useEffect(() => {
        getUserFullInfo();
    }, [getUserFullInfo]);

    return {user}
}

export default useUser;