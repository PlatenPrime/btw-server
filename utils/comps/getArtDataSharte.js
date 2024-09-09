class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = "NetworkError";
    }
}


const regexPrice = /(\d+(\.\d{2})?)\sгрн/;

function extractPriceFromTitle(title) {
    const match = title.match(regexPrice);
    return match ? match[1] : null;
}

function extractAvailabilityFromResponse(responseString) {
    const toolsLocations = responseString.indexOf("smallElementTools");
    const searchValueAvailability = "наявності";
    const searchValueBeLocation = responseString.indexOf(searchValueAvailability, toolsLocations);
    const letter = responseString.slice(searchValueBeLocation - 2, searchValueBeLocation - 1);

    let isAvailable = null;

    if (letter) {
        isAvailable = letter === letter.toUpperCase();
    }

    return isAvailable;
}

export async function getArtDataSharte(link) {
    try {
        const searchValuePrice = "title";

        const response = await fetch(link, {
            cache: 'no-store', // Запрещаем кэширование
        })

        // if (!response.ok) {
        //     throw new NetworkError('Network response was not ok');
        // }

        const responseString = await response.text();



        const indexPrice = responseString.indexOf(searchValuePrice);
        const indexPrice2 = responseString.indexOf(searchValuePrice, indexPrice + searchValuePrice.length);
        const title = responseString.slice(indexPrice, indexPrice2 + searchValuePrice.length);

        const price = extractPriceFromTitle(title);

        const isAvailable = extractAvailabilityFromResponse(responseString);

        // console.log(price ? `Цена: ${price} грн` : "Цена не найдена");
        // console.log(isAvailable ? "Товар в наличии" : "Товара нет в наличии");

        return { price, isAvailable };

    } catch (error) {
        console.error(error);
    }
}
