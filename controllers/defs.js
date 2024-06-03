import Def from "../models/Def.js";



// Get All Defs
export const getAllDefs = async (req, res) => {
    try {
        const defs = await Def.find();
        if (!defs || defs.length === 0) {
            return res.json({ message: 'Дефицитов нет' });
        }
        res.status(200).json(defs);
    } catch (error) {
        res.json({ message: error.message });
    }
}



// Get Latest Def
export const getLatestDef = async (req, res) => {
    try {
        const latestDef = await Def.find().sort({ 'createdAt': -1 }).limit(1);
        if (!latestDef) {
            return res.json({ message: 'Дефицитов нет' });
        }
        res.status(200).json(latestDef);
    } catch (error) {
        res.json({ message: error.message });
    }
}
