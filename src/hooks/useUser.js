import { useDispatch, useSelector } from 'react-redux';

import { REQUEST_STATUSES } from '../consts/REQUEST_STATUSES';
import useRequest from './useRequest';
import { REQUEST_TYPE, HTTP_METHODS } from '../consts/HTTP';
import useNotify, {NOTIFY_TYPES} from './useNotify';
import { getNormalDate } from '../utils/getNormalDate';

import { updateUser, setUserIsLoading, initCards, addCards, updateCard } from '../redux/slices/user';

const useUser = () => {
    const dispatch = useDispatch();
    const {request} = useRequest();
    const {user, cards} = useSelector(state => state.user);
    const {alertNotify, notifyTemplate} = useNotify();

    const getUserShortInfo = async () => {
        dispatch(setUserIsLoading(true));

        const data = await request(REQUEST_TYPE.USER, "/short_info", HTTP_METHODS.GET, true);

        dispatch(setUserIsLoading(false));

        if(data.status !== REQUEST_STATUSES.NOT_SUCCESSFUL && data !== REQUEST_STATUSES.SITE_NOT_AVAILABLE && data.status !== 403){
            dispatch(updateUser(data));
        }

        return data;
    }

    const getUserFullInfo = async () => {
        if(user.secondName){
            return;
        }

        dispatch(setUserIsLoading(true));

        const data = await request(REQUEST_TYPE.USER, "/full_info", HTTP_METHODS.GET, true);

        dispatch(setUserIsLoading(false));

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL){
            return;
        }

        dispatch(updateUser(data));
    };

    const sendVerifyRequest = async (passportData, granted, grantedDate, birthdate, sex, successCallback = () => {}) => {
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
            grantedDate: getNormalDate(grantedDate),
            birthdate: getNormalDate(birthdate),
            sex
        });

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL || data.status === 500){
            switch(data.error){
                default:
                    return notifyTemplate(NOTIFY_TYPES.ERROR);
            }
        }

        dispatch(updateUser(data));

        successCallback();
        alertNotify("Успешно", "Данные успешно отправлены на рассмотрение", "success");
    }

    const createCard = async (typeId, firstName, secondName, successCallback = () => {}) => {
        dispatch(setUserIsLoading(true));

        const data = await request(REQUEST_TYPE.USER, "/card", HTTP_METHODS.POST, true, {
            typeId,
            firstName,
            secondName
        });

        dispatch(setUserIsLoading(false));

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL || data.status === 500){
            switch(data.error){
                default:
                    return notifyTemplate(NOTIFY_TYPES.ERROR);
            }
        }

        dispatch(addCards(data));

        successCallback();
        alertNotify("Успешно", "Карта успешно выпущена", "success");
    }

    const getCards = async () => {
        if(cards.length){
            return;
        }

        dispatch(setUserIsLoading(true));

        const data = await request(REQUEST_TYPE.USER, "/cards", HTTP_METHODS.GET, true);

        dispatch(setUserIsLoading(false));

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL){
            return;
        }

        dispatch(initCards(data));
    }

    const cancelVerify = async (successCallback = () => {}) => {
        dispatch(setUserIsLoading(true));

        const data = await request(REQUEST_TYPE.USER, "/cancel_data", HTTP_METHODS.POST, true);

        dispatch(setUserIsLoading(false));

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL || data.status === 500){
            switch(data.error){
                default:
                    return notifyTemplate(NOTIFY_TYPES.ERROR);
            }
        }

        dispatch(updateUser(data));

        successCallback();
        alertNotify("Успешно", "Вы отменили отправку верификации", "success");
    }

    const blockCard = async (id, successCallback = () => {}) => {
        dispatch(setUserIsLoading(true));

        const data = await request(REQUEST_TYPE.USER, "/card/block", HTTP_METHODS.POST, true, {id});

        dispatch(setUserIsLoading(false));

        if(data.status === REQUEST_STATUSES.NOT_SUCCESSFUL || data.status === 500){
            switch(data.error){
                default:
                    return notifyTemplate(NOTIFY_TYPES.ERROR);
            }
        }

        dispatch(updateCard({id, data}));

        successCallback();
        alertNotify("Успешно", "Карта заблокирована", "success");
    }

    return {
        getUserShortInfo,
        getUserFullInfo,
        sendVerifyRequest,
        createCard,
        getCards,
        cancelVerify,
        blockCard
    }
}

export default useUser;