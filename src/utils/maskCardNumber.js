export const maskCardNumber = (cardNumber) => {
    return `**** **** **** ${cardNumber.substring(cardNumber.length - 4)}`;
}