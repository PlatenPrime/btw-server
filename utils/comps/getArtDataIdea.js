import { getStringSlice } from "../getStringSlice.js";


class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = "NetworkError";
    }
}



const searchLocationString = `itemtype="http://schema.org/Offer"`;
const searchQuantLocationWord = `<span>Наявність:</span>`;
const searchPriceLocationWord = `грн`;
const searchNameLocationString = `<h1 class="h-title" id="title-page">`;



function extractPackFromNameLocationString(searchNameLocationString, responseString) {

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

    return pack

}



function extractQuantFromStringSlice(stringSlice, responseString) {

    const indexQuant = stringSlice?.indexOf(searchQuantLocationWord);

    if (indexQuant === -1) {
        return null; // Не найдено значение 
    }

    const quantSlice = stringSlice.slice(indexQuant, indexQuant + 50);

    const quantPack = +quantSlice?.split("")
        .filter(char => ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(char))
        .join("");

    const pack = extractPackFromNameLocationString(searchNameLocationString, responseString);

    const quant = (quantPack * pack);

    return quant;
}



function extractPriceFromStringSlice(stringSlice, responseString) {

    const indexPrice = stringSlice?.lastIndexOf(searchPriceLocationWord);

    if (indexPrice === -1) {
        return null; // Не найдено значение
    }

    const priceOpt = stringSlice?.slice(indexPrice - 20, indexPrice)
        .split("")
        .filter(char => ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."].includes(char))
        .join("");

    const pack = extractPackFromNameLocationString(searchNameLocationString, responseString);

    const price = (Number(priceOpt) / pack).toFixed(2);

    return price

}



export async function getArtDataIdea(ideaLink) {
    try {
        const response = await fetch(ideaLink, {
            cache: 'no-store', // Запрещаем кэширование 
        })

        const responseString = await response.text();

        const stringSlice = getStringSlice(responseString, searchLocationString, 2000);

        const quant = extractQuantFromStringSlice(stringSlice, responseString);
        const price = extractPriceFromStringSlice(stringSlice, responseString);

        return { quant, price };

    } catch (error) {
        if (error instanceof NetworkError) {
            console.error("Network error:", error.message);
        } else {
            console.error("Unknown error:", error);
        }
    }
}