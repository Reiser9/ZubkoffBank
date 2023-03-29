import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useRequest, { HTTP_METHODS, REQUEST_TYPE } from './useRequest';
import { initUsers } from '../redux/slices/admin';

const useAdmin = () => {
    const [users, setUsers] = React.useState([]);
    const [isLoad, setIsLoad] = React.useState(false);
    const [error, setError] = React.useState(false);

    const {users: usersData} = useSelector(state => state.admin);
    const dispatch = useDispatch();
    const {request} = useRequest();

    const getUsers = async () => {
        setIsLoad(true);

        if(Object.keys(usersData).length !== 0){
            setUsers(usersData);
        }
        else{
            const data = await request(REQUEST_TYPE.ADMIN, "/users", HTTP_METHODS.GET, true);

            if(!data){
                setError(true);
            }
            else{
                dispatch(initUsers(data));
                setUsers(data);
            }
        }

        setIsLoad(false);
    }

    return {isLoad, error, users, getUsers}
}

export default useAdmin;