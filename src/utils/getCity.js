import {city, weather, currency} from '../api';

export const getCity = async () => {
    const {data} = await city.get();

    const cityName = data.city.name_ru;
    const lat = data.city.lat;
    const lon = data.city.lon;
    const timezone = data.region.timezone;

    return {cityName, lat, lon, timezone};
}

export const getWeather = async (lat, lon) => {
    const {data} = await weather(`?lat=${lat}&lon=${lon}&lang=ru&units=metric&appid=${process.env.REACT_APP_WEATHER_TOKEN}`);

    const wind = data.wind.speed.toFixed(1);
    const description = data.weather[0].description;
    const main = data.weather[0].main;
    const temp = data.main.temp.toFixed(1);
    const humidity = data.main.humidity;
    const feels_like = data.main.feels_like.toFixed(1);

    return {temp, humidity, feels_like, wind, main, description};
}

export const getCurrency = async (from = "USD") => {
    try {
        const data = await currency.get(`convert?to=RUB&from=${from}&amount=1&apikey=${process.env.REACT_APP_CURRENCY_TOKEN}`);

        const currencyResult = data.data.result.toFixed(2);

        return currencyResult;
    } catch (error) {
        console.log(error);
    }
}