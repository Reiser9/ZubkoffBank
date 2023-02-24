import {currency} from "../api"

export const getCurrency = async (from = "USD") => {
    const data = await currency.get(`convert?to=RUB&from=${from}&amount=1&apikey=${process.env.REACT_APP_CURRENCY_TOKEN}`);

    const currencyResult = data.data.result.toFixed(2);

    return currencyResult;
}