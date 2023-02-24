export const getWeatherIcon = (desc) => {
    switch (desc) {
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
