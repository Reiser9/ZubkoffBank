import { useDispatch, useSelector } from 'react-redux';

import { REQUEST_STATUSES } from '../consts/REQUEST_STATUSES';
import useRequest, { REQUEST_TYPE, HTTP_METHODS } from './useRequest';
import useNotify from './useNotify';

import { updateUser, setUserIsLoading, initCards } from '../redux/slices/user';

const useUser = () => {
    const dispatch = useDispatch();
    const {request} = useRequest();
    const {user, cards} = useSelector(state => state.user);
    const {alertNotify} = useNotify();

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

    const sendVerifyRequest = async (passportData, granted, grantedDate, birthdate, sex) => {
        if(passportData.length < 11){
            return alertNotify("Ошибка", "Введите корректные данные паспорта", "warn");
        }
        if(!granted){
            return alertNotify("Ошибка", "Введите кем выдан паспорт", "warn");
        }
        if(grantedDate.length < 11){
            return alertNotify("Ошибка", "Введите дату выдачи паспорта", "warn");
        }
        if(birthdate.length < 11){
            return alertNotify("Ошибка", "Введите данные о дне рождения", "warn");
        }

        const passportDataSplit = passportData.split(" ");

        const data = await request(REQUEST_TYPE.USER, "/data", HTTP_METHODS.POST, true, {
            passportSer: passportDataSplit[0],
            passportNum: passportDataSplit[1],
            granted,
            grantedDate: grantedDate.format("DD.MM.YYYY"),
            birthdate: birthdate.format("DD.MM.YYYY"),
            sex
        });

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL){
            return alertNotify("Ошибка", "Произошла ошибка, попробуйте позже", "warn");
        }

        dispatch(updateUser(data));

        alertNotify("Успешно", "Данные успешно отправлены на рассмотрение", "success");
    }

    const createCard = async (typeId, firstName, secondName) => {
        const data = await request(REQUEST_TYPE.USER, "/card", HTTP_METHODS.POST, true, {
            typeId,
            firstName,
            secondName
        });

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL){
            return alertNotify("Ошибка", "Произошла ошибка, попробуйте позже", "warn");
        }

        alertNotify("Успешно", "Карта успешно выпущена", "success");
    }

    const getCards = async () => {
        dispatch(setUserIsLoading(true));

        if(!cards.length){
            const data = await request(REQUEST_TYPE.USER, "/cards", HTTP_METHODS.GET, true);

            if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL){
                return;
            }

            dispatch(initCards(data));
        }

        dispatch(setUserIsLoading(false));
    }

    return {getUserShortInfo, getUserFullInfo, sendVerifyRequest, createCard, getCards}
}

export default useUser;