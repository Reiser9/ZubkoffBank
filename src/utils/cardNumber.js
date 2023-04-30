export const maskCardNumber = (cardNumber, short = false) => {
    if(!cardNumber){
        return cardNumber;
    }

    if(!short){
        return `**** **** **** ${cardNumber.substring(cardNumber.length - 4)}`;
    }

    return `**** ${cardNumber.substring(cardNumber.length - 4)}`;
}

export const getFormatCardNumber = (cardNumber) => {
    if(!cardNumber){
        return cardNumber;
    }

    const regex = /(\d{4})/g;
    const formattedNumber = cardNumber.replace(regex, '$1 ');

    return formattedNumber.trim();
}