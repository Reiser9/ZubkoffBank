export const unmaskPhone = (phoneNumber) => {
    if(!phoneNumber){
        return phoneNumber;
    }

    return phoneNumber.replace(/[^\d+]/g, '');
}

// phoneNumber = +79999999999 - пример
export const maskPhone = (phoneNumber) => {
    if(!phoneNumber || phoneNumber.length < 12){
        return phoneNumber;
    }

    const countryCode = phoneNumber.slice(0, 2);
    const regionCode = phoneNumber.slice(2, 5);
    const firstPart = phoneNumber.slice(5, 8);
    const secondPart = phoneNumber.slice(8, 10);
    const thirdPart = phoneNumber.slice(10, 12);
    
    return `${countryCode}(${regionCode}) ${firstPart} ${secondPart}-${thirdPart}`;
}