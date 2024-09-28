class NetworkError extends Error {
	constructor(message) {
		super(message);
		this.name = "NetworkError";
	}
}

const regexPrice = /(\d+(\.\d+)?) грн\./;
const regexAvailability = /Наявність: (.+)/;

function extractPriceFromString(valueString) {
	const match = valueString.match(regexPrice);
	return match ? parseFloat(match[1]).toFixed(2) : null;
}

function extractAvailabilityFromString(valueString) {
	const match = valueString.match(regexAvailability);
	if (match) {
		const availabilityTextWithTags = match[1].trim();
		const availabilityText = availabilityTextWithTags.replace(/<[^>]*>/g, ""); // Удаление HTML-тегов
		return availabilityText === 'Є в наявності';
	}
	return false;
}

export async function getArtDataAir(airLink) {

	const defaultData = { price: "N/A", isAvailable: "N/A" }; // Значения по умолчанию
	const timeout = 5000; // 5 секунд

	// Тайм-аутный промис
	const timeoutPromise = new Promise((resolve) =>
		setTimeout(() => resolve(defaultData), timeout)
	);



	try {

		// Используем Promise.race для ограничения времени ожидания
		const response = await Promise.race([
			fetch(airLink, { cache: 'no-store' }),
			timeoutPromise
		]);

		// Если вернулись значения по умолчанию, значит был тайм-аут
		if (response === defaultData) {
			console.warn('Request timed out, returning default values');
			return defaultData;
		}



		const responseString = await response.text();


		const priceStartIndex = responseString.indexOf("Ціна за ед.:");
		const availabilityStartIndex = responseString.indexOf("Наявність:");

		if (priceStartIndex === -1 || availabilityStartIndex === -1) {
			throw new Error("Price or availability information not found");
		}

		const priceText = responseString.slice(priceStartIndex, availabilityStartIndex);
		const availabilityText = responseString.slice(availabilityStartIndex);

		const price = extractPriceFromString(priceText);
		const isAvailable = extractAvailabilityFromString(availabilityText);


		return { price, isAvailable };
	} catch (error) {
		if (error instanceof NetworkError) {
			console.error("Network error:", error.message);
		} else {
			console.error("Unknown error:", error);
		}

	}
}
