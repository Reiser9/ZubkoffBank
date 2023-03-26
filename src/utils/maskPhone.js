export const unmaskPhone = (phoneNumber) => {
    return phoneNumber.replace(/[^\d+]/g, '');
}

export const maskPhone = (phoneNumber) => {
    const countryCode = phoneNumber.slice(0, 2);
    const regionCode = phoneNumber.slice(2, 5);
    const firstPart = phoneNumber.slice(5, 8);
    const secondPart = phoneNumber.slice(8, 10);
    const thirdPart = phoneNumber.slice(10, 12);
    
    return `${countryCode}(${regionCode}) ${firstPart} ${secondPart}-${thirdPart}`;
}