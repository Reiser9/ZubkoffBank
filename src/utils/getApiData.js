import {city, weather, currency} from '../api';

export const getCity = async () => {
    try{
        const {data} = await city.get();

        const cityName = data.city.name_ru;
        const lat = data.city.lat;
        const lon = data.city.lon;
        const timezone = data.region.timezone;

        const {temp, humidity, feels_like, wind, main, description, error} = await getWeather(lat, lon);

        if(error){
            return {error: true};
        }

        return {cityName, timezone, temp, humidity, feels_like, wind, main, description};
    }catch(error){
        console.log(error);

        return {error: true};
    }
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
    catch(error){
        console.log(error);

        return {error: true};
    }
}

const getOneCurrency = async (from = "USD") => {
    try{
        const data = await currency.get(`convert?to=RUB&from=${from}&amount=1&apikey=${process.env.REACT_APP_CURRENCY_TOKEN}`);

        const currencyResult = data.data.result.toFixed(2);

        return {currencyResult};
    }catch(err){
        console.log(err);

        return {error: true};
    }
}

export const getCurrency = async () => {
    let currencyUsd = await getOneCurrency();
    let currencyEur = await getOneCurrency("EUR");

    if(currencyUsd.error || currencyEur.error){
        return {error: true}
    }

    currencyUsd = currencyUsd.currencyResult;
    currencyEur = currencyEur.currencyResult;

    return {currencyUsd, currencyEur};
}