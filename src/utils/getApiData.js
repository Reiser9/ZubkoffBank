import {city, weather, currency} from '../api';
import {isBot} from './isBot';

export const getCity = async () => {
    try{
        // throw new Error(); // Убрать при продакшене
        if(isBot()){
            throw new Error();
        }

        const {data} = await city.get();

        const cityName = data.city.name_ru ? data.city.name_ru : "Тюмень";
        const lat = data.city.name_ru ? data.city.lat : "57.1522";
        const lon = data.city.name_ru ? data.city.lon : "65.5272";
        const timezone = data.city.name_ru ? data.region.timezone : "Asia/Yekaterinburg";

        const {temp, humidity, feels_like, wind, main, description, error} = await getWeather(lat, lon);

        if(error){
            return {error: true};
        }

        return {cityName, timezone, temp, humidity, feels_like, wind, main, description};
    }catch(err){
        return {error: true};
    }
}

export const getCurrency = async () => {
    if(isBot()){
        return {error: true}
    }

    const [currencyUsd, currencyEur] = await Promise.all([
        getOneCurrency("USD"),
        getOneCurrency("EUR")
    ]);

    if(currencyUsd.error || currencyEur.error){
        return {error: true}
    }

    return {
        currencyUsd: currencyUsd.currencyResult,
        currencyEur: currencyEur.currencyResult
    };
}

const getWeather = async (lat, lon) => {
    try{
        const {data} = await weather(`?lat=${lat}&lon=${lon}&lang=ru&units=metric&appid=${process.env.REACT_APP_WEATHER_TOKEN}`);

        const wind = data.wind.speed.toFixed(1);
        const description = data.weather[0].description;
        const main = data.weather[0].main;
        const temp = data.main.temp.toFixed(1);
        const humidity = data.main.humidity;
        const feels_like = data.main.feels_like.toFixed(1);

        return {temp, humidity, feels_like, wind, main, description};
    }
    catch(err){
        return {error: true};
    }
}

const getOneCurrency = async (from = "USD") => {
    try{
        // throw new Error();
        const data = await currency.get(`convert?to=RUB&from=${from}&amount=1`, {
            headers: {
                "apikey": process.env.REACT_APP_CURRENCY_TOKEN
            }
        });

        const currencyResult = data.data.result.toFixed(2);

        return {currencyResult};
    }catch(err){
        return {error: true};
    }
}