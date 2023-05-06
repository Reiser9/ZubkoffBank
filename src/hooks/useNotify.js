import { useDispatch, useSelector } from 'react-redux';

import {NOTIFY_TYPES} from '../consts/NOTIFY_TYPES';
import {addNotify} from '../redux/slices/notify';

const useNotify = () => {
    const dispatch = useDispatch();
    const {notify} = useSelector(state => state.notify);

    const alertNotify = (title, text, type = "success", time = 2000) => {
        if(notify.length >= 3){
            return;
        }

        const idNotify = new Date().getTime();

        const notifyObject = {
            id: idNotify,
            title,
            text,
            type,
            time
        }

        dispatch(addNotify(notifyObject));
    }

    const notifyTemplate = (type) => {
        switch(type){
            case NOTIFY_TYPES.PHONE:
                return alertNotify("Предупреждение", "Введите корректный номер телефона", "warn");
            case NOTIFY_TYPES.ERROR:
                return alertNotify("Ошибка", "Упс, что-то пошло не так", "error");
            case NOTIFY_TYPES.PASSWORD_SHORT:
                return alertNotify("Предупреждение", "Пароль не может быть меньше 8 символов", "warn");
            case NOTIFY_TYPES.PASSWORD_LONG:
                return alertNotify("Предупреждение", "Пароль не может быть больше 35 символов", "warn");
            case NOTIFY_TYPES.CODE:
                return alertNotify("Предупреждение", "Введите корректный код", "warn");
            case NOTIFY_TYPES.INVALID_CODE:
                return alertNotify("Ошибка", "Неверный или недействительный код", "error");
            case NOTIFY_TYPES.CONFIRM_PASSWORD:
                return alertNotify("Предупреждение", "Пароли не совпадают", "warn");
            case NOTIFY_TYPES.USER_ALREADY_EXISTS:
                return alertNotify("Ошибка", "Пользователь в такими данными уже зарегистрирован", "warn");
            case NOTIFY_TYPES.WRONG_PASSWORD:
                return alertNotify("Ошибка", "Неверный пароль", "error");
            default:
                break;
        }
    }

    return {alertNotify, notifyTemplate};
}

export default useNotify;