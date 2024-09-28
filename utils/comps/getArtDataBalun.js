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
const searchNameLocationString = `data-qaid="product_name"`





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


    const priceOpt = stringSlice?.slice(indexPrice - 20, indexPrice)
        .split("")
        .filter(char => ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ","].includes(char))
        .map(char => char === "," ? "." : char)
        .join("");


    let pack = 1;
    const nameLocationStartIndex = stringSlice?.indexOf(searchNameLocationString);
    const nameLocationEndIndex = stringSlice?.indexOf("</span>", nameLocationStartIndex);
    const nameString = stringSlice?.slice(nameLocationStartIndex, nameLocationEndIndex);

    const match = nameString.match(/(\d+)\s*шт/);

    if (match) {
        pack = match[1];
    } else {
        console.log('Количество не найдено');
    }

    const price = (Number(priceOpt) / pack).toFixed(2);

    return price

}




export async function getArtDataBalun(balunLink) {


    const defaultData = { price: "N/A", isAvailable: "N/A" }; // Значения по умолчанию
    const timeout = 5000; // 5 секунд

    // Тайм-аутный промис
    const timeoutPromise = new Promise((resolve) =>
        setTimeout(() => resolve(defaultData), timeout)
    );


    try {


        const response = await Promise.race([
            fetch(balunLink, {
                cache: 'no-store', // Запрещаем кэширование 
            }),
            timeoutPromise
        ]);

        // Если вернулись значения по умолчанию, значит был тайм-аут
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
        if (error instanceof NetworkError) {
            console.error("Network error:", error.message);
        } else {
            console.error("Unknown error:", error);
        }
    }
}