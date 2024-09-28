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


    const defaultData = { price: "N/A", isAvailable: "N/A" }; // Значения по умолчанию
    const timeout = 5000; // 5 секунд

    // Тайм-аутный промис
    const timeoutPromise = new Promise((resolve) =>
        setTimeout(() => resolve(defaultData), timeout)
    );





    try {


        const response = await Promise.race([
            fetch(link, {
                cache: 'no-store', // Запрещаем кэширование
            }),
            timeoutPromise
        ]);

        const searchValuePrice = "title";

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
