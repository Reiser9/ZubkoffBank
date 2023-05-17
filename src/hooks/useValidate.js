import React from 'react';

import {VALIDATE_TYPE} from '../consts/VALIDATE_TYPE';

import useNotify from './useNotify';

const useValidate = () => {
    const {alertNotify} = useNotify();

    const validate = () => {
        
    }

    return {validate}
}

export default useValidate;