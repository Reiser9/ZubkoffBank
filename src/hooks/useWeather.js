import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {getCity} from '../utils/getApiData';
import {setWeatherData} from '../redux/slices/api';
import {getNormalWord} from '../utils/getNormalWord';
import {getWeatherIcon} from '../utils/getWeatherIcon';

const useWeather = () => {
    const [error, setError] = React.useState(false);
    const [isLoad, setIsLoad] = React.useState(false);

    const {weather} = useSelector(state => state.api);
    const dispatch = useDispatch();

    const getCityData = async () => {
        setIsLoad(true);

        if(Object.keys(weather).length === 0){
            const {cityName, timezone, error, wind, description, temp, humidity, feels_like, main} = await getCity();

            if(error){
                setError(true);
            }
            else{
                const weatherObj = {
                    city: cityName,
                    timezone: timezone,
                    temp: temp,
                    humidity: humidity,
                    tempDesc: getNormalWord(description),
                    feelsLike: feels_like,
                    wind: wind,
                    weatherIcon: getWeatherIcon(main)
                }

                dispatch(setWeatherData(weatherObj));
            }
        }

        setIsLoad(false);
    };

    React.useEffect(() => {
        getCityData();
    }, []);

    return {isLoad, error};
}

export default useWeather;