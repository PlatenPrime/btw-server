import { sendFileToPlaten } from "../sendMessagesTelegram.js";
import fs from 'fs/promises'; // Используем промисы для асинхронной работы с файлами
import path from 'path';
import { fileURLToPath } from 'url';
import CollectionsDataFetcher from "./getCollectionsData.js";

// Получаем текущую директорию для ES-модулей
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const collectionsDataFetcher = new CollectionsDataFetcher();

// Проверка существования директории
const directoryExists = async (dirPath) => {
    try {
        await fs.access(dirPath);
        return true;
    } catch {
        return false;
    }
}

// Создаем директорию, если она не существует
const collectionsDir = path.join(__dirname, 'collections');
if (!await directoryExists(collectionsDir)) {
    await fs.mkdir(collectionsDir); // Асинхронная версия создания директории
}

// Функция для отправки всех коллекций в Telegram
export const sendCollectionsDataToTelegram = async () => {
    try {
        const collectionsData = await collectionsDataFetcher.getAllCollectionsData();

        for (const key of Object.keys(collectionsData)) {
            const collection = collectionsData[key];
            const collectionName = key;

            // Пропускаем пустые коллекции
            if (!collection || Object.keys(collection).length === 0) {
                console.warn(`Коллекция ${collectionName} пуста или не содержит данных.`);
                continue;
            }

            await sendCollectionDataToTelegram(collection, collectionName);
            console.log(`Файл для коллекции ${collectionName} успешно отправлен.`);
        }

        // После успешной отправки всех файлов очищаем директорию
        await clearCollectionsDir();

    } catch (error) {
        console.error('Ошибка при отправке данных коллекций:', error);
    }
}

// Функция для отправки одной коллекции в Telegram
export const sendCollectionDataToTelegram = async (collection, collectionName) => {
    const filePath = path.join(collectionsDir, `${collectionName}.json`);

    try {
        // Асинхронная запись файла
        await fs.writeFile(filePath, JSON.stringify(collection, null, 2));
        console.log(`Файл сохранен по пути: ${filePath}`);

        // Проверка наличия файла перед отправкой
        if (await fileExists(filePath)) {
            await sendFileToPlaten(filePath);
            console.log(`Файл ${filePath} успешно отправлен в Telegram.`);
        } else {
            console.error(`Файл ${filePath} не существует, отправка отменена.`);
        }
    } catch (error) {
        console.error(`Ошибка при создании или отправке файла для коллекции ${collectionName}:`, error);
    }
}

// Функция для проверки существования файла
const fileExists = async (filePath) => {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}

// Функция для очистки директории collections
const clearCollectionsDir = async () => {
    try {
        const files = await fs.readdir(collectionsDir);
        for (const file of files) {
            const filePath = path.join(collectionsDir, file);
            await fs.unlink(filePath);
            console.log(`Файл ${filePath} удален.`);
        }
        console.log('Директория collections очищена.');
    } catch (error) {
        console.error('Ошибка при очистке директории collections:', error);
    }
}
