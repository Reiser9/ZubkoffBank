export const maskCardNumber = (cardNumber) => {
    if(cardNumber){
        return `**** **** **** ${cardNumber.substring(cardNumber.length - 4)}`;
    }
}

export const getFormatCardNumber = (cardNumber) => {
    if(cardNumber){
        const regex = /(\d{4})/g;
        const formattedNumber = cardNumber.replace(regex, '$1 ');

        return formattedNumber.trim();
    }
}