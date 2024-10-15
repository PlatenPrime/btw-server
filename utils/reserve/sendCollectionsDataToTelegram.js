import { sendFileToPlaten } from "../sendMessagesTelegram.js";
import { getAllCollectionsData } from "./getCollectionsData.js";
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';

// Получаем текущую директорию для ES-модулей
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Создаем директорию, если она не существует
const collectionsDir = path.join(__dirname, 'collections');
if (!fs.existsSync(collectionsDir)) {
    fs.mkdirSync(collectionsDir);
}



export const sendCollectionsDataToTelegram = async () => {

    try {

        const collectionsData = await getAllCollectionsData();


        for (const key of Object.keys(collectionsData)) {
            const collection = collectionsData[key];
            const collectionName = key;

            await sendCollectionDataToTelegram(collection, collectionName)

            console.log(`Файл для коллекции ${collectionName} успешно отправлен.`);
        };

        // После успешной отправки всех файлов очищаем директорию
        clearCollectionsDir();

    } catch (error) {
        console.error('Ошибка при отправке данных коллекций:', error);
    }
}



export const sendCollectionDataToTelegram = async (collection, collectionName) => {
    const filePath = path.join(collectionsDir, `${collectionName}.json`);

    fs.writeFileSync(filePath, JSON.stringify(collection, null, 2));

    sendFileToPlaten(filePath);

}


const clearCollectionsDir = () => {
    fs.readdirSync(collectionsDir).forEach((file) => {
        const filePath = path.join(collectionsDir, file);
        fs.unlinkSync(filePath);
    });

    console.log('Директория collections очищена.');
}