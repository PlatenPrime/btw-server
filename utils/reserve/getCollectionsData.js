import Art from "../../models/Art.js";
import Ask from "../../models/Ask.js";
import Comp from "../../models/Comp.js";
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

class CollectionsDataFetcher {
    constructor() {
        this.models = {
            artData: Art,
            askData: Ask,
            compData: Comp,
            compVariantData: CompVariant,
            defData: Def,
            insData: Ins,
            insFolderData: InsFolder,
            palletData: Pallet,
            posData: Pos,
            roleData: Role,
            rowData: Row,
            testData: Test,
            userData: User,
        };
    }

    async fetchCollectionData(collectionName) {
        try {
            const model = this.models[collectionName];
            if (!model) {
                throw new Error(`Collection ${collectionName} is not defined.`);
            }
            const data = await model.find().lean();
            return data;
        } catch (error) {
            console.error(`Ошибка получения данных из коллекции ${collectionName}:`, error);
            throw error;
        }
    }

    async getAllCollectionsData() {
        try {
            const fetchPromises = Object.keys(this.models).map((key) =>
                this.fetchCollectionData(key)
            );
            const results = await Promise.all(fetchPromises);

            return Object.keys(this.models).reduce((acc, key, index) => {
                acc[key] = results[index];
                return acc;
            }, {});
        } catch (error) {
            console.error('Ошибка при получении всех данных:', error);
            throw error;
        }
    }
}

export default CollectionsDataFetcher;
