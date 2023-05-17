export const getWeatherIcon = (description) => {
    switch (description) {
        case "Clear":
            return "cloud-sun";
        case "Snow":
            return "cloud-snow";
        case "Drizzle" || "Rain":
            return "cloud-rain";
        case "Thunderstorm":
            return "cloud-light";
        default:
            return "cloud";
    }
};
