export const getLogoBank = () => {
    switch(process.env.REACT_APP_BANK_NAME){
        case "Zubkoff":
            return "/assets/img/logo1.svg";
        case "Vetroff":
            return "/assets/img/logo2.svg";
        case "Amirhanoff":
            return "/assets/img/logo3.svg";
        default:
            return "/assets/img/logo1.svg";
    }
}

export const getCardBank = () => {
    switch(process.env.REACT_APP_BANK_NAME){
        case "Zubkoff":
            return "/assets/img/card-black-zubkoff.svg";
        case "Vetroff":
            return "/assets/img/card-black-vetroff.svg";
        case "Amirhanoff":
            return "/assets/img/card-black-amirhanoff.svg";
        default:
            return "/assets/img/card-black-zubkoff.svg";
    }
}