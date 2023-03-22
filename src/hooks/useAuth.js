import { useDispatch } from 'react-redux';

import useRequest, { REQUEST_TYPE, HTTP_METHODS } from './useRequest';

import { setAuthIsLoading, setLogin } from '../redux/slices/auth';
import { setUser } from '../redux/slices/user';

const useAuth = () => {
    const dispatch = useDispatch();
    const {request} = useRequest();

    const clearData = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("typeToken");

        dispatch(setUser({}));
        dispatch(setAuthIsLoading(false));
    }

    const checkAuth = async () => {
        dispatch(setAuthIsLoading(true));

        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const typeToken = localStorage.getItem("typeToken");

        if(!accessToken || !refreshToken || !typeToken){
            return clearData();
        }

        const data = await request(REQUEST_TYPE.USER, "/full_info", HTTP_METHODS.GET, true);

        if(data.status === 500 || data.status === 403){
            const newTokens = await request(REQUEST_TYPE.AUTH, "/refresh", HTTP_METHODS.POST, false, {refreshToken});

            localStorage.setItem("accessToken", newTokens.accessToken);
            localStorage.setItem("refreshToken", newTokens.refreshToken);
            localStorage.setItem("typeToken", newTokens.typeToken);

            checkAuth();
        }

        dispatch(setLogin({accessToken, refreshToken, typeToken, isAuth: true}));
        dispatch(setUser(data));
        dispatch(setAuthIsLoading(false));
    }

    return {checkAuth}
}

export default useAuth;