import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

import {getCity} from '../../utils/getApiData';
import {getWeatherIcon} from '../../utils/getWeatherIcon';
import {getNormalWord} from '../../utils/getNormalWord';

import {Location} from '../../components/Icons';

import PreloaderFill from '../Preloader/PreloaderFill';
import WeatherBox from './WeatherBox';
import ErrorBlock from '../ErrorBlock';

const WeatherItem = () => {
    const [weather, setWeather] = React.useState({});
    const [error, setError] = React.useState(false);
    const [isLoad, setIsLoad] = React.useState(false);

    const getCityData = async () => {
        setIsLoad(true);

        const {cityName, timezone, error, wind, description, temp, humidity, feels_like, main} = await getCity();

        if(error){
            setError(true);
        }
        else{
            setWeather({
                city: cityName,
                timezone: timezone,
                temp: temp,
                humidity: humidity,
                tempDesc: getNormalWord(description),
                feelsLike: feels_like,
                wind: wind,
                weatherIcon: getWeatherIcon(main)
            });
        }

        setIsLoad(false);
    }

    React.useEffect(() => {
        getCityData();
    }, []);

    return(
        <div className="weather__inner">
            {isLoad ? <PreloaderFill /> : error ? <ErrorBlock text="Сервис погоды временно недоступен" /> : <>
                <div className="weather__info">
                    <div className="weather__location">
                        <Location className="weather__location--icon" />

                        <p className="weather__city">{weather.city}</p>
                    </div>

                    <div className="weather__dot"></div>

                    <div className="weather__time"><Moment tz={weather.timezone} format="HH:mm" interval={1000} /></div>
                </div>

                <div className="weather__temp">
                    <img src={`/assets/img/${weather.weatherIcon}.svg`} alt={weather.weatherIcon} className="weather__temp--icon big" />

                    <div className="weather__current-temp-inner">
                        <p className="weather__current-temp">{weather.temp}°</p>

                        <p className="weather__name">{weather.tempDesc}</p>
                    </div>
                </div>

                <div className="weather__items">
                    <WeatherBox title="Ощущается" icon="like" value={`${weather.feelsLike}°`} />
                    <WeatherBox title="Ветер" icon="wind" value={`${weather.wind} м/с`} />
                    <WeatherBox title="Влажность" icon="humidity" value={`${weather.humidity} %`} />
                </div>
            </>}
        </div>
    )
}

export default WeatherItem;