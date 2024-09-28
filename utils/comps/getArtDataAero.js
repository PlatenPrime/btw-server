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
    const defaultData = { price: "N/A", isAvailable: "N/A" }; // Значения по умолчанию
    const timeout = 5000; // 5 секунд

    // Функция для создания промиса тайм-аута
    const timeoutPromise = new Promise((resolve) => 
        setTimeout(() => resolve(defaultData), timeout)
    );

    try {
        // Используем Promise.race, чтобы ограничить время ожидания запроса
        const response = await Promise.race([
            fetch(aeroLink, { cache: 'no-store' }),
            timeoutPromise
        ]);

        if (response === defaultData) {
            console.warn('Request timed out, returning default values');
            return defaultData;
        }

        const responseString = await response.text();
        const stringSlice = getStringSlice(responseString, searchLocationString, 2000);
        const isAvailable = extractAvailFromStringSlice(stringSlice);
        const price = extractPriceFromStringSlice(stringSlice);

        return { price, isAvailable };
    } catch (error) {
        console.error('Error during fetch, returning default values:', error);
        return defaultData; // Возвращаем значения по умолчанию в случае ошибки
    }
}