import React from 'react';

import {PAGGINATION_DATA} from '../consts/PAGGINATION_DATA';

import useAdmin from './useAdmin';

const usePaggination = () => {
    const [isLoad, setIsLoad] = React.useState(false);

    const {getUsers, getCardTypes} = useAdmin();

    const dataPaggination = {
        [PAGGINATION_DATA.USERS]: getUsers,
        [PAGGINATION_DATA.CARD_TYPES]: getCardTypes
    }

    const paggination = async (page = 0, limit = 10, data = PAGGINATION_DATA.USERS) => {
        setIsLoad(true);

        await dataPaggination[data](page, limit);

        setIsLoad(false);
    }

    return {
        isLoad,
        paggination
    }
}

export default usePaggination;