import InsFolder from "../models/InsFolder.js";
import Instruction from "../models/Ins.js";



export const createInsFolder = async (req, res) => {
	try {
		const { title } = req.body;
		const newInsFolder = await InsFolder.create({ title });
		res.status(201).json(newInsFolder);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};




export const getAllInsFolders = async (req, res) => {
	try {
		const insFolders = await InsFolder.find().sort('title');		
		res.status(200).json({ insFolders });
	} catch (error) {
		res.json({ message: error.message });
	}	
}


export const getInsFolderById = async (req, res) => {
	try {
		const insFolder = await InsFolder.findById(req.params.id);
		if (!insFolder) {
			return res.status(404).json({ message: 'InsFolder not found' });
		}
		res.json(insFolder);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}


export const updateInsFolderById = async (req, res) => {
	try {
		const { title } = req.body;
		const insFolder = await InsFolder.findByIdAndUpdate(
			req.params.id,
			{ title },
			{ new: true }
		);
		if (!insFolder) {
			return res.status(404).json({ message: 'InsFolder not found' });
		}
		res.status(200).json(insFolder);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}


export const deleteInsFolderById = async (req, res) => {
	try {
		const insFolder = await InsFolder.findById(req.params.id);
		if (!insFolder) {
			return res.status(404).json({ message: 'InsFolder not found' });
		}

const insIds = insFolder.instructions;

await Instruction.deleteMany({ _id: { $in: insIds } });

await InsFolder.findByIdAndDelete(req.params.id);

		res.status(200).json(insFolder);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}