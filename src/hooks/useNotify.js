import { useDispatch } from 'react-redux';

import {addNotify} from '../redux/slices/notify';

const useNotify = () => {
    const dispatch = useDispatch();

    const alertNotify = (title, text, type = "success", time = 2000) => {
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

    return {alertNotify};
}

export default useNotify;