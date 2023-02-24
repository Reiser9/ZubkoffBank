import React from "react";
import Moment from 'react-moment';
import moment from 'moment-timezone';

import "./index.css";

import {Location} from '../../components/Icons';

import {getCity, getWeather} from '../../utils/getCity';
import {getWeatherIcon} from '../../utils/getWeatherIcon';
import {getCurrency} from "../../utils/getCurrency";

import PreloaderFill from '../Preloader/PreloaderFill';

const WeatherBlock = () => {
    const [city, setCity] = React.useState("");
    const [timezone, setTimezone] = React.useState("");
    const [temp, setTemp] = React.useState("");
    const [humidity, setHumidity] = React.useState("");
    const [tempDesc, setTempDesc] = React.useState("");
    const [feelsLike, setFeelsLike] = React.useState("");
    const [wind, setWind] = React.useState("");
    const [weatherIcon, setWeatherIcon] = React.useState("cloud");

    const [weatherLoad, setWeatherLoad] = React.useState(false);
    const [currencyLoad, setCurrencyLoad] = React.useState(false);

    const [usd, setUsd] = React.useState(false);
    const [eur, setEur] = React.useState(false);

    const getCityData = async () => {
        setWeatherLoad(true);
        setCurrencyLoad(true);
        const {cityName, timezone} = await getCity();
        const {wind, description, temp, humidity, feels_like, main} = await getWeather();
        
        setCity(cityName);
        setTimezone(timezone);
        setTemp(temp);
        setTempDesc(description);
        setFeelsLike(feels_like);
        setWind(wind);
        setWeatherIcon(getWeatherIcon(main));
        setHumidity(humidity);
        setWeatherLoad(false);

        const currencyUsd = await getCurrency("USD");
        const currencyEur = await getCurrency("EUR");
        setUsd(currencyUsd);
        setEur(currencyEur);
        setCurrencyLoad(false);
    }

    React.useEffect(() => {
        getCityData();
    }, []);

    return (
        <div className="weather">
            <div className="weather__inner">
                {weatherLoad ? <PreloaderFill /> : <>
                    <div className="weather__info">
                        <div className="weather__location">
                            <Location className="weather__location--icon" />

                            <p className="weather__city">{city}</p>
                        </div>

                        <div className="weather__dot"></div>

                        <div className="weather__time"><Moment tz={timezone} format="HH:mm" interval={1000} /></div>
                    </div>

                    <div className="weather__temp">
                        <img src={`/assets/img/${weatherIcon}.svg`} alt={weatherIcon} className="weather__temp--icon big" />

                        <div className="weather__current-temp-inner">
                            <p className="weather__current-temp">{temp}°</p>

                            <p className="weather__name">{tempDesc[0]?.toUpperCase() + tempDesc?.slice(1)}</p>
                        </div>
                    </div>

                    <div className="weather__items">
                        <div className="item-weather">
                            <div className="item-weather__time">Ощущается</div>

                            <div className="item-weather__temp">
                                <img src="/assets/img/like.svg" alt="cloud" className="weather__temp--icon" />

                                <p className="item-weather__value">{feelsLike}°</p>
                            </div>
                        </div>

                        <div className="item-weather">
                            <div className="item-weather__time">Ветер</div>

                            <div className="item-weather__temp">
                                <img src="/assets/img/wind.svg" alt="wind" className="weather__temp--icon" />

                                <p className="item-weather__value">{wind} м/с</p>
                            </div>
                        </div>

                        <div className="item-weather">
                            <div className="item-weather__time">Влажность</div>

                            <div className="item-weather__temp">
                                <img src="/assets/img/humidity.svg" alt="humidity" className="weather__temp--icon" />

                                <p className="item-weather__value">{humidity}%</p>
                            </div>
                        </div>
                    </div>
                </>}
            </div>

            <div className="course-weather">
                {currencyLoad ? <PreloaderFill /> : <>
                    <p className="course-weather__label">
                        Курс рубля от ЦБ РФ на сегодня
                    </p>

                    <div className="course-weather__info">
                        <p className="course-weather__day">Сегодня</p>

                        <div className="course-weather__currency">
                            <p className="course-weather__currency-name">USD</p>

                            <div className="course-weather__value">₽ {usd}</div>
                        </div>

                        <div className="course-weather__currency">
                            <p className="course-weather__currency-name">EUR</p>

                            <div className="course-weather__value">₽ {eur}</div>
                        </div>
                    </div>
                </>}
            </div>
        </div>
    );
};

export default WeatherBlock;
