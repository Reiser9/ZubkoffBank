export const findElementById = (obj, id) => {
    if(!obj || !id){
        return;
    }

    return obj.find(item => item.id === id);
}