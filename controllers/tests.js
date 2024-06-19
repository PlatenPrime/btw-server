import Adapt from '../models/Adapt.js';
import Test from '../models/Test.js';



export const createTest = async (req, res) => {
    try {
        const { adaptId, questions } = req.body;
        const newTest = new Test({ adaptId, questions });

const adapt = await Adapt.findById(adaptId);
        if (!adapt) {
            return res.status(404).json({ message: 'Adapt not found' });
        }

        if (adapt.test) {
            return res.status(400).json({ message: 'Adapt already has a test' });
        }

        adapt.test = newTest._id;

        await adapt.save();
        await newTest.save();
        res.status(201).json(newTest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



export const getAllTests = async (req, res) => {
    try {
        const tests = await Test.find();
        res.status(200).json(tests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getTestById = async (req, res) => {
    try {
        const test = await Test.findById(req.params.id);
        res.status(200).json(test);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const updateTestById = async (req, res) => {
    try {
        const { adaptId, questions } = req.body;
        const test = await Test.findByIdAndUpdate(req.params.id, { adaptId, questions }, { new: true });
        res.status(200).json(test);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const deleteTestById = async (req, res) => {
    try {
        const test = await Test.findByIdAndDelete(req.params.id);
        const adapt = await Adapt.findByIdAndUpdate(test.adaptId, { test: null }, { new: true });
        res.status(200).json(test);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const deleteAllTests = async (req, res) => {
    try {
        const tests = await Test.deleteMany();
        const adapt = await Adapt.updateMany({}, { test: null }, { new: true });
        res.status(200).json(tests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}