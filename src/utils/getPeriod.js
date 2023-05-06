export const getPeriod = (period) => {
    switch(period){
        case 1:
            return "день";
        case 7:
            return "нед.";
        case 30:
            return "мес.";
        default:
            return "";
    }
}