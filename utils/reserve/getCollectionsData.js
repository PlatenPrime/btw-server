import Art from "../../models/Art.js";
import Ask from "../../models/Ask.js";
import Comp from "../../models/Comp.js";
import CompStamp from "../../models/CompStamp.js";
import CompVariant from "../../models/CompVariant.js";
import Def from "../../models/Def.js";
import Ins from "../../models/Ins.js";
import InsFolder from "../../models/InsFolder.js";
import Pallet from "../../models/Pallet.js";
import Pos from "../../models/Pos.js";
import Role from "../../models/Role.js";
import Row from "../../models/Row.js";
import Test from "../../models/Test.js";
import User from "../../models/User.js";




export const getAllCollectionsData = async () => {
    try {
        const [
            artData,
            askData,
            compData,
            compStampData,
            compVariantData,
            defData,
            insData,
            insFolderData,
            palletData,
            posData,
            roleData,
            rowData,
            testData,
            userData
        ] = await Promise.all([
            getArtData(),
            getAskData(),
            getCompData(),
            getCompStampData(),
            getCompVariantData(),
            getDefData(),
            getInsData(),
            getInsFolderData(),
            getPalletData(),
            getPosData(),
            getRoleData(),
            getRowData(),
            getTestData(),
            getUserData()
        ]);

        return {
            artData,
            askData,
            compData,
            compStampData,
            compVariantData,
            defData,
            insData,
            insFolderData,
            palletData,
            posData,
            roleData,
            rowData,
            testData,
            userData
        };
    } catch (error) {
        console.error('Ошибка при получении всех данных:', error);
        throw error;
    }
};



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


export const getAskData = async () => {
    try {
        // Получаем все данные из коллекции
        const data = await Ask.find().lean();
        return data;
    } catch (error) {
        console.error('Ошибка получения данных из MongoDB:', error);
        throw error;
    }
};


export const getCompData = async () => {
    try {
        // Получаем все данные из коллекции
        const data = await Comp.find().lean();
        return data;
    } catch (error) {
        console.error('Ошибка получения данных из MongoDB:', error);
        throw error;
    }
};


export const getCompStampData = async () => {
    try {
        // Получаем все данные из коллекции
        const data = await CompStamp.find().lean();
        return data;
    } catch (error) {
        console.error('Ошибка получения данных из MongoDB:', error);
        throw error;
    }
};




export const getCompVariantData = async () => {
    try {
        // Получаем все данные из коллекции
        const data = await CompVariant.find().lean();
        return data;
    } catch (error) {
        console.error('Ошибка получения данных из MongoDB:', error);
        throw error;
    }
};


export const getDefData = async () => {
    try {
        // Получаем все данные из коллекции
        const data = await Def.find().lean();
        return data;
    } catch (error) {
        console.error('Ошибка получения данных из MongoDB:', error);
        throw error;
    }
};



export const getInsData = async () => {
    try {
        // Получаем все данные из коллекции
        const data = await Ins.find().lean();
        return data;
    } catch (error) {
        console.error('Ошибка получения данных из MongoDB:', error);
        throw error;
    }
};


export const getInsFolderData = async () => {
    try {
        // Получаем все данные из коллекции
        const data = await InsFolder.find().lean();
        return data;
    } catch (error) {
        console.error('Ошибка получения данных из MongoDB:', error);
        throw error;
    }
};


export const getPalletData = async () => {
    try {
        // Получаем все данные из коллекции
        const data = await Pallet.find().lean();
        return data;
    } catch (error) {
        console.error('Ошибка получения данных из MongoDB:', error);
        throw error;
    }
};


export const getPosData = async () => {
    try {
        // Получаем все данные из коллекции
        const data = await Pos.find().lean();
        return data;
    } catch (error) {
        console.error('Ошибка получения данных из MongoDB:', error);
        throw error;
    }
};


export const getRoleData = async () => {
    try {
        // Получаем все данные из коллекции
        const data = await Role.find().lean();
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



export const getTestData = async () => {
    try {
        // Получаем все данные из коллекции
        const data = await Test.find().lean();
        return data;
    } catch (error) {
        console.error('Ошибка получения данных из MongoDB:', error);
        throw error;
    }
};


export const getUserData = async () => {
    try {
        // Получаем все данные из коллекции
        const data = await User.find().lean();
        return data;
    } catch (error) {
        console.error('Ошибка получения данных из MongoDB:', error);
        throw error;
    }
};