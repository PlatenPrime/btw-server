import InsFolder from "../models/InsFolder.js";



export const createInsFolder = async (req, res) => {
	try {
		const { title, color } = req.body;



		const newInsFolder = await InsFolder.create({ title, color });


		res.status(201).json(newInsFolder);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};