import { getStringSlice } from "../getStringSlice.js";

class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = "NetworkError";
    }
}



const searchLocationString = `b-product__info-line b-product__info-line_type_prices`;
const searchAvailLocationWord = "наявності";
const searchPriceLocationWord = "₴";




function extractAvailFromStringSlice(stringSlice) {

    const indexAvail = stringSlice?.indexOf(searchAvailLocationWord);

    if (indexAvail === -1) {
        return null; // Не найдено значение 
    }

    if (stringSlice[indexAvail - 2] === "В") return true;
    if (stringSlice[indexAvail - 2] === "в") return false;

    return null;

}


function extractPriceFromStringSlice(stringSlice) {
    const indexPrice = stringSlice?.lastIndexOf(searchPriceLocationWord);

    if (indexPrice === -1) {
        return null; // Не найдено значение 
    }

    const price = stringSlice?.slice(indexPrice - 20, indexPrice)
        .split("")
        .filter(char => ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ","].includes(char))
        .map(char => char === "," ? "." : char)
        .join("");

    return price
}






export async function getArtDataAero(aeroLink) {
    try {
        const response = await fetch(aeroLink, {
            cache: 'no-store', // Запрещаем кэширование 
        })


        const responseString = await response.text();

        const stringSlice = getStringSlice(responseString, searchLocationString, 2000);

        const isAvailable = extractAvailFromStringSlice(stringSlice);
        const price = extractPriceFromStringSlice(stringSlice);

        return { price, isAvailable };

    } catch (error) {
        if (error instanceof NetworkError) {
            console.error("Network error:", error.message);
        } else {
            console.error("Unknown error:", error);
        }
    }
}
