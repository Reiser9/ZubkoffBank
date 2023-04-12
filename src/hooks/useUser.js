import { useDispatch, useSelector } from 'react-redux';

import { REQUEST_STATUSES } from '../consts/REQUEST_STATUSES';
import useRequest, { REQUEST_TYPE, HTTP_METHODS } from './useRequest';

import { updateUser, setUserIsLoading } from '../redux/slices/user';

const useUser = () => {
    const dispatch = useDispatch();
    const {request} = useRequest();
    const {user} = useSelector(state => state.user);

    const getUserShortInfo = async () => {
        dispatch(setUserIsLoading(true));

        const data = await request(REQUEST_TYPE.USER, "/short_info", HTTP_METHODS.GET, true);

        dispatch(setUserIsLoading(false));

        if(data.status !== REQUEST_STATUSES.NOT_SUCCESSFUL){
            dispatch(updateUser(data));
        }

        return data;
    }

    const getUserFullInfo = async () => {
        dispatch(setUserIsLoading(true));

        if(!user.secondName){
            const data = await request(REQUEST_TYPE.USER, "/full_info", HTTP_METHODS.GET, true);

            if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL){
                return;
            }

            dispatch(updateUser(data));
        }
        
        dispatch(setUserIsLoading(false));
    };

    return {getUserShortInfo, getUserFullInfo}
}

export default useUser;