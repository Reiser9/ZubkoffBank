import React from 'react';

const WeatherBox = ({title, icon, value}) => {
    return(
        <div className="item-weather">
            <div className="item-weather__time">{title}</div>

            <div className="item-weather__temp">
                <img src={`/assets/img/${icon}.svg`} alt={icon} className="weather__temp--icon" />

                <p className="item-weather__value">{value}</p>
            </div>
        </div>
    )
}

export default WeatherBox;