import { getStringSlice } from "../getStringSlice.js";

class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = "NetworkError";
  }
}

const searchLocationString = `h1 namne_details`;
const searchQuantLocationWord = `<span id="product-availability"`;
const searchPriceLocationWord = `<span class='current-price-value' content="`;

export async function getArtDataChudo(chudoLink) {
  const defaultData = { price: "N/A", quant: "N/A" }; // Значения по умолчанию
  const timeout = 5000; // 5 секунд

  // Тайм-аутный промис
  const timeoutPromise = new Promise((resolve) =>
    setTimeout(() => resolve(defaultData), timeout)
  );

  try {
    const response = await Promise.race([
      fetch(chudoLink, {
        cache: "no-store", // Запрещаем кэширование
      }),
      timeoutPromise,
    ]);

    const responseString = await response.text();

    const stringSlice = getStringSlice(
      responseString,
      searchLocationString,
      5000
    );

    const pack = extractPackFromNameLocationString(stringSlice, "</h1>");
    const price = extractPriceFromStringSlice(stringSlice, pack);
    const quant = extractQuantFromStringSlice(stringSlice, pack);

    return { quant, price };
    
  } catch (error) {
    if (error instanceof NetworkError) {
      console.error("Network error:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
  }
}

function extractPackFromNameLocationString(stringSlice, stopWord) {
  const indexOfStopWord = stringSlice?.indexOf(stopWord);
  if (indexOfStopWord === -1) {
    return null; // Не найдено значение
  }

  const title = stringSlice.slice(0, indexOfStopWord);

  const quantityPattern = /\(?(\d+)\s*шт\)?/; // делаем обе скобки необязательными
  const match = title.match(quantityPattern);

  return match ? match[1] : 1;
}

function extractPriceFromStringSlice(stringSlice, pack) {
  const indexPrice = stringSlice?.indexOf(searchPriceLocationWord);

  if (indexPrice === -1) {
    return null; // Не найдено значение
  }

  const startOfPrice = indexPrice + searchPriceLocationWord.length;
  const endOfPrice = stringSlice.indexOf(`"`, startOfPrice);

  const priceString = stringSlice.slice(startOfPrice, endOfPrice);

  const price = (Number(priceString) / pack).toFixed(2);

  return price;
}

function extractQuantFromStringSlice(stringSlice, pack) {
  const indexOfStartQuantSpan = stringSlice?.indexOf(searchQuantLocationWord);

  if (indexOfStartQuantSpan === -1) {
    return null;
  }

  const indexOfEndQuantSpan = stringSlice?.indexOf(
    `</span>`,
    indexOfStartQuantSpan
  );

  const quantSpan = stringSlice.slice(
    indexOfStartQuantSpan,
    indexOfEndQuantSpan
  );

  const indexOfQuant = quantSpan.indexOf(`наявності`);

  if (indexOfQuant === -1) {
    return 0;
  }

  const quantString = quantSpan.slice(indexOfQuant);

  const quant = quantString
    .split("")
    .filter((char) =>
      ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(char)
    )
    .join("");

  return quant * pack;
}
