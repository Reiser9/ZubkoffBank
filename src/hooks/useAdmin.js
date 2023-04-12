import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { REQUEST_STATUSES } from '../consts/REQUEST_STATUSES';
import useRequest, { HTTP_METHODS, REQUEST_TYPE } from './useRequest';
import { initUsers } from '../redux/slices/admin';

const useAdmin = () => {
    const [isLoad, setIsLoad] = React.useState(false);
    const [error, setError] = React.useState(false);

    const {users} = useSelector(state => state.admin);
    const dispatch = useDispatch();
    const {request} = useRequest();

    const getUsers = async () => {
        setIsLoad(true);

        if(Object.keys(users).length === 0){
            const data = await request(REQUEST_TYPE.ADMIN, "/users", HTTP_METHODS.GET, true);

            if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL){
                return setError(true);
            }
            else{
                dispatch(initUsers(data));
            }
        }

        setIsLoad(false);
    }

    return {isLoad, error, getUsers}
}

export default useAdmin;