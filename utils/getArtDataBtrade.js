


import axios from "axios"



class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = "NetworkError";
    }
}

const regex = /(\d+(\.\d+)?)/;

function extractValueFromString(valueString, searchValue, back = false) {
    try {
        const index = valueString.indexOf(searchValue);
        const substring = back ? valueString.slice(index - 50, index) : valueString.slice(index, index + 50);
        const match = substring.match(regex);
        return match ? match[0] : null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

function extractQuantFromString(valueString) {
    const searchQuantPrefix = "У наявності: ";

    // Ищем индекс начала "У наявності"
    const startIndex = valueString?.indexOf(searchQuantPrefix);

    // Если "У наявності" не найдено, возвращаем 0
    if (startIndex === -1) {
        return 0;
    }

    // Находим подстроку после "У наявності"
    const quantString = valueString?.slice(startIndex + searchQuantPrefix.length);

    // Парсим строку в число и возвращаем
    const quant = parseInt(quantString, 10);

    // Если не удалось распарсить число, возвращаем 0
    if (isNaN(quant)) {
        return 0;
    }

    return quant;
}


function extractPriceFromString(valueString) {
    const searchPriceValue = 'грн';
    const extractedPrice = extractValueFromString(valueString, searchPriceValue, true, true);
    return extractedPrice ? parseFloat(extractedPrice).toFixed(2) : null;
}

export async function getArtDataBtrade(art) {


    try {



        const response = await fetch(`https://sharik.ua/ua/search/?q=${art}`, {
            cache: 'no-store', // Запрещаем кэширование
        })

        const responseString = await response.text();

        console.log(responseString);



        const quant = extractQuantFromString(responseString);
        const price = extractPriceFromString(responseString);

        console.log("Цена Btrade", price);
        console.log("Наличие Btrade", quant);


        return { price, quant };
    } catch (error) {
        if (error instanceof NetworkError) {
            console.error("Network error:", error.message);
        } else {
            console.error("Unknown error:", error);
        }

    }
}
