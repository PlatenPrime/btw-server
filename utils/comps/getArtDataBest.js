class NetworkError extends Error {
	constructor(message) {
		super(message);
		this.name = "NetworkError";
	}
}

export async function getArtDataBest(bestLink) {


	let price; // Объявляем переменную price здесь


	const defaultData = { price: "N/A", isAvailable: "N/A" }; // Значения по умолчанию		
	const timeout = 5000; // 5 секунд

	const timeoutPromise = new Promise((resolve) =>
		setTimeout(
			() => resolve(defaultData),
			timeout));


	try {


		const response = await Promise.race([
			fetch(bestLink, {
				cache: 'no-store', // Запрещаем кэширование
			}),

			timeoutPromise
		])



		const responseString = await response.text();

		// Регулярное выражение для поиска цены в двух форматах
		const regexPrice1 = /<p class="price"><span class="woocommerce-Price-amount amount">(\d+\.\d{2})&nbsp;/;
		const regexPrice2 = /<p class="price"><span class="woocommerce-Price-amount amount">(\d+\.\d{4})&nbsp;/;

		const regexPriceDisc1 = /<ins><span class="woocommerce-Price-amount amount">(\d+\.\d{2})&nbsp;/;
		const regexPriceDisc2 = /<ins><span class="woocommerce-Price-amount amount">(\d+\.\d{4})&nbsp;/;

		const priceMatch1 = responseString.match(regexPrice1);
		const priceMatch2 = responseString.match(regexPrice2);

		const priceMatchDisc1 = responseString.match(regexPriceDisc1);
		const priceMatchDisc2 = responseString.match(regexPriceDisc2);


		if (priceMatch1) {
			price = parseFloat(priceMatch1[1]).toFixed(2);
		} else if (priceMatch2) {
			price = parseFloat(priceMatch2[1]).toFixed(4) + '€';
		} else if (priceMatchDisc1) {
			price = parseFloat(priceMatchDisc1[1]).toFixed(2)
		} else if (priceMatchDisc2) {
			price = parseFloat(priceMatchDisc2[1]).toFixed(4) + '€';
		} else {
			throw new Error("Price information not found");
		}


		// Регулярное выражение для проверки наличия (без изменений)
		const regexAvailability = /Немає в наявності/;

		const availabilityMatch = responseString.match(regexAvailability);

		const isAvailable = !availabilityMatch;


		// console.log("Цена Best: ", price)
		// console.log("Наличие Best", isAvailable)


		return { price, isAvailable };
	} catch (error) {
		if (error instanceof NetworkError) {
			console.error("Network error:", error.message);
		} else {
			console.error("Unknown error:", error);
		}

	}
}
