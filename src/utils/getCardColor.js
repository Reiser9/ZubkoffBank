export const getCardColor = (cardName) => {
    switch (cardName) {
        case "Junior":
            return "bil-payment_junior";
        case "Platinum":
            return "bil-payment_platinum";
        case "Drive":
            return "bil-payment_drive";
        case "Black":
            return "bil-payment_black";
        default:
            return "bil-payment_default";
    }
}