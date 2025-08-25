class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = "NetworkError";
    }
}

// Разные регулярки
const priceRegex = /(\d{1,3}(?:[ \u00A0.,]\d{3})*(?:[.,]\d{2})?)/;
const quantityRegex = /(\d+)/;

function extractValueFromString(valueString, searchValue, back = false, isPrice = false) {
    const index = valueString.indexOf(searchValue);
    if (index === -1) {
        return null;
    }

    const substring = back
        ? valueString.slice(Math.max(0, index - 50), index)
        : valueString.slice(index, index + 50);

    const regexToUse = isPrice ? priceRegex : quantityRegex;
    const match = substring.match(regexToUse);
    if (!match) return null;

    let value = match[0];

    if (isPrice) {
        value = value.replace(/\s|\u00A0/g, '').replace(',', '.');
        return parseFloat(value).toFixed(2); // сразу возвращаем строку с двумя знаками
    } else {
        return parseInt(value, 10); // целое количество
    }
}

function extractQuantFromString(valueString) {
    const searchQuantValue = "В наявності";
    const notAvailableString = "Немає в наявності";

    if (valueString.includes(notAvailableString)) {
        return 0;
    }
    return extractValueFromString(valueString, searchQuantValue, false, false);
}

function extractPriceFromString(valueString) {
    const searchPriceValue = '₴/шт';
    return extractValueFromString(valueString, searchPriceValue, true, true);
}

function extractProductPriceFromString(valueString, pack = 1) {
    const searchPriceValue = '₴';
    const index = valueString.indexOf(searchPriceValue);
    if (index === -1) return null;

    const substring = valueString.slice(Math.max(0, index - 50), index);
    const match = substring.match(priceRegex);
    if (!match) return null;

    const priceFloat = parseFloat(match[0].replace(/\s|\u00A0/g, '').replace(',', '.'));
    return (priceFloat / pack).toFixed(2);
}

function extractQuantityInPackFromString(valueString) {
    const regexPack = /(\d+)шт/;
    const match = valueString.match(regexPack);
    return match && match[1] ? parseInt(match[1], 10) : null;
}

export async function getArtDataYumi(yumiLink) {
    const defaultData = { price: "N/A", quant: "N/A" };
    const timeout = 5000;

    const timeoutPromise = new Promise((resolve) =>
        setTimeout(() => resolve(defaultData), timeout)
    );

    try {
        const response = await Promise.race([
            fetch(yumiLink, { cache: 'no-store' }),
            timeoutPromise
        ]);

        const responseString = await response.text();
        let quant = extractQuantFromString(responseString);
        let price = extractPriceFromString(responseString);
        let pack = extractQuantityInPackFromString(responseString);

        if (pack) {
            quant = quant * pack;
        }

        if (!price) {
            pack = pack || 1;
            price = extractProductPriceFromString(responseString, pack);
        }

        return { price, quant };
    } catch (error) {
        if (error instanceof NetworkError) {
            console.error("Network error:", error.message);
        } else {
            console.error("Unknown error:", error);
        }
    }
}
