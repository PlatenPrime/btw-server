class NetworkError extends Error {
	constructor(message) {
		super(message);
		this.name = "NetworkError";
	}
}

export async function getArtDataBest(bestLink) {
	

	let price; // Объявляем переменную price здесь

	try {

        const response = await fetch(bestLink, {
            cache: 'no-store', // Запрещаем кэширование
        })



		if (!response.ok) {
			throw new NetworkError('Network response was not ok');
		}

		const responseString = await response.text();

		// Регулярное выражение для поиска цены в двух форматах
		const regexPrice1 = /<p class="price"><span class="woocommerce-Price-amount amount">(\d+\.\d{2})&nbsp;/;
		const regexPrice2 = /<p class="price"><span class="woocommerce-Price-amount amount">(\d+\.\d{4})&nbsp;/;
		const priceMatch1 = responseString.match(regexPrice1);
		const priceMatch2 = responseString.match(regexPrice2);

		if (priceMatch1) {
			price = parseFloat(priceMatch1[1]).toFixed(2);
		} else if (priceMatch2) {
			price = parseFloat(priceMatch2[1]).toFixed(4) + '€';
		} else {
			throw new Error("Price information not found");
		}


		// Регулярное выражение для проверки наличия (без изменений)
		const regexAvailability = /Немає в наявності/;

		const availabilityMatch = responseString.match(regexAvailability);

		const isAvailable = !availabilityMatch;


		console.log("Цена Best: ", price)
		console.log("Наличие Best", isAvailable)


		return { price, isAvailable };
	} catch (error) {
		if (error instanceof NetworkError) {
			console.error("Network error:", error.message);
		} else {
			console.error("Unknown error:", error);
		}
		throw error;
	}
}
