import axios from 'axios';

export const weather = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/weather',
});

export const city = axios.create({
    baseURL: 'https://api.sypexgeo.net/json',
});

export const currency = axios.create({
    baseURL: 'https://api.apilayer.com/currency_data'
});