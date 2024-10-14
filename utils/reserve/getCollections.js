import Art from "../../models/Art.js";
import Row from "../../models/Row.js";


export const getArtData = async () => {
    try {
        // Получаем все данные из коллекции
        const data = await Art.find().lean();
        return data;
    } catch (error) {
        console.error('Ошибка получения данных из MongoDB:', error);
        throw error;
    }
};


export const getRowData = async () => {
    try {
        // Получаем все данные из коллекции
        const data = await Row.find().lean();
        return data;
    } catch (error) {
        console.error('Ошибка получения данных из MongoDB:', error);
        throw error;
    }
};