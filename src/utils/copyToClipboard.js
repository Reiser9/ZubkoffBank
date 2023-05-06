export const copyToClipboard = (text) => {
    if(!text){
        return;
    }

    navigator.clipboard.writeText(text);
}