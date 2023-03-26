import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {getCurrency} from '../utils/getApiData';
import {setCurrencyData} from '../redux/slices/api';

const useCurrency = () => {
    const [isLoad, setIsLoad] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [currency, setCurrency] = React.useState({});

    const {currency: currencyData} = useSelector(state => state.api);
    const dispatch = useDispatch();

    const getCurrencyData = React.useCallback(async () => {
        setIsLoad(true);

        if(Object.keys(currencyData).length !== 0){
            setCurrency(currencyData);
        }
        else{
            const {currencyUsd, currencyEur, error} = await getCurrency();
        
            if(error){
                setError(true);
            }
            else{
                const currencyObj = {
                    usd: currencyUsd,
                    eur: currencyEur
                }

                dispatch(setCurrencyData(currencyObj));
                setCurrency(currencyObj);
            }
        }

        setIsLoad(false);
    }, [dispatch, currencyData]);

    React.useEffect(() => {
        getCurrencyData();
    }, [getCurrencyData]);

    return {isLoadCurrency: isLoad, errorCurrency: error, currency};
}

export default useCurrency;