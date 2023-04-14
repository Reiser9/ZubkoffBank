export const getFormatedNumber = (number, toFixed = 2) => {
    if(typeof number === "number"){
        return new Intl.NumberFormat("ru").format(number.toFixed(toFixed))
    }
}