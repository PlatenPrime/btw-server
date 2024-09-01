import { getStringSlice } from "../getStringSlice.js";

class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = "NetworkError";
    }
}


const searchLocationString = `class="product__group "`;
const searchAvailLocationWord = `class="product-order__row"`;
const searchPriceLocationWord = `<meta itemprop="price" content`;
const searchNameLocationString = `<h1 class="product-title" itemprop="name">`



function extractAvailFromStringSlice(stringSlice) {

    const indexAvail = stringSlice?.indexOf(searchAvailLocationWord);

    if (indexAvail === -1) {
        return null; // Не найдено значение 
    }

    const availSlice = stringSlice.slice(indexAvail, indexAvail + 3000);

    if (availSlice.includes("Купити")) return true;
    return false
}


function extractPriceFromStringSlice(stringSlice, responseString) {

    const indexPrice = stringSlice?.lastIndexOf(searchPriceLocationWord);

    const priceOpt = stringSlice?.slice(indexPrice, indexPrice + 100)
        .split("")
        .filter(char => ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ","].includes(char))
        .join("")


    let pack = 1;

    const nameLocationStartIndex = responseString?.indexOf(searchNameLocationString);
    const nameLocationEndIndex = responseString?.indexOf("</h1>", nameLocationStartIndex);
    const nameString = responseString?.slice(nameLocationStartIndex, nameLocationEndIndex);

    const match = nameString.match(/(\d+)\s*шт/);

    if (match) {
        pack = match[1];
    } else {
        console.log('Количество не найдено');
    }

    const price = (Number(priceOpt) / pack).toFixed(2);

    return price;

}




export async function getArtDataSvyato(svyatoLink) {
    try {
        const response = await fetch(svyatoLink, {
            cache: 'no-store', // Запрещаем кэширование 
        })


        const responseString = await response.text();

        const stringSlice = getStringSlice(responseString, searchLocationString, 10000);


        const isAvailable = extractAvailFromStringSlice(stringSlice);
        const price = extractPriceFromStringSlice(stringSlice, responseString);

        return { price, isAvailable };


    } catch (error) {
        if (error instanceof NetworkError) {
            console.error("Network error:", error.message);
        } else {
            console.error("Unknown error:", error);
        }
    }
}