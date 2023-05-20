import React from 'react';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import 'moment-timezone';

import {Location} from '../../components/Icons';

import Preloader from '../Preloader';
import WeatherBox from './WeatherBox';
import ErrorBlock from '../ErrorBlock';

import useWeather from '../../hooks/useWeather';

const WeatherItem = () => {
    const {isLoad, error} = useWeather();
    const {weather} = useSelector(state => state.api);

    return(
        <div className="weather__inner">
            {isLoad ? <Preloader fill small /> : error ? <ErrorBlock text="Сервис погоды временно недоступен" /> : <>
                <div className="weather__info">
                    <div className="weather__location">
                        <Location className="weather__location--icon" />

                        <p className="weather__city">{weather.city || "Тюмень"}</p>
                    </div>

                    <div className="weather__dot"></div>

                    <div className="weather__time"><Moment tz={weather.timezone} format="HH:mm" interval={1000} /></div>
                </div>

                <div className="weather__temp">
                    {weather.weatherIcon && <img src={`/assets/img/${weather.weatherIcon}.svg`} alt={weather.weatherIcon} className="weather__temp--icon big" />}

                    <div className="weather__current-temp-inner">
                        <p className="weather__current-temp">{weather.temp || 0}°</p>

                        <p className="weather__name">{weather.tempDesc || ""}</p>
                    </div>
                </div>

                <div className="weather__items">
                    <WeatherBox title="Ощущается" icon="like" value={`${weather.feelsLike || 0}°`} />
                    <WeatherBox title="Ветер" icon="wind" value={`${weather.wind || 0} м/с`} />
                    <WeatherBox title="Влажность" icon="humidity" value={`${weather.humidity || 0} %`} />
                </div>
            </>}
        </div>
    )
}

export default WeatherItem;