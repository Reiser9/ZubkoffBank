import React from "react";

import "./index.css";

import WeatherItem from "./WeatherItem";
import CurrencyItem from "./CurrencyItem";

const WeatherBlock = () => {
    return (
        <div className="weather">
            <WeatherItem />

            <CurrencyItem />
        </div>
    );
};

export default WeatherBlock;
