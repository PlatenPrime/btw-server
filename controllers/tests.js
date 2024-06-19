import Test from '../models/Test.js';



export const createTest = async (req, res) => {
    try {
        const { adaptId, questions } = req.body;
        const newTest = new Test({ adaptId, questions });
        await newTest.save();
        res.status(201).json(newTest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}