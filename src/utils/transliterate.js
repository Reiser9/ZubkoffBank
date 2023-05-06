export const transliterate = (str, upper = false) => {
    const ru = {
        а: "a",
        б: "b",
        в: "v",
        г: "g",
        д: "d",
        е: "e",
        ё: "e",
        ж: "zh",
        з: "z",
        и: "i",
        й: "y",
        к: "k",
        л: "l",
        м: "m",
        н: "n",
        о: "o",
        п: "p",
        р: "r",
        с: "s",
        т: "t",
        у: "u",
        ф: "f",
        х: "h",
        ц: "c",
        ч: "ch",
        ш: "sh",
        щ: "shch",
        ъ: "",
        ы: "y",
        ь: "",
        э: "e",
        ю: "yu",
        я: "ya",
    };

    return str.split("").map(char => {
            const lowercaseChar = ru[char.toLowerCase()];

            if(!lowercaseChar){
                return char;
            }

            if(upper){
                return lowercaseChar.toUpperCase();
            }

            return char === char.toUpperCase() ? lowercaseChar.toUpperCase() : lowercaseChar;
        }).join("");
};
