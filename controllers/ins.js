import Instruction from "../models/Ins.js";
import InsFolder from "../models/InsFolder.js";

// Create One Instruction
export const createInstruction = async (req, res) => {
	try {
		const { title, titleImage, author, videoUrl, body, folderId } = req.body

		const newInstruction = new Instruction({ title, titleImage, author, videoUrl, body, folderId })


		await InsFolder.findByIdAndUpdate(folderId, { $push: { instructions: newInstruction._id } }, { new: true })

		await newInstruction.save()

		return res.json(newInstruction)

	} catch (error) {
		res.json({ message: "Что-то не так с созданием инструкции" })
	}
}

//Update One Instruction
export const updateOrCreateInstruction = async (req, res) => {
	try {
		const { title, titleImage, author, videoUrl, body, folderId } = req.body;

		// Попробуем найти документ по title
		let existingInstruction = await Instruction.findById(req.params.id);

		if (existingInstruction) {
			// Если документ найден, обновим его поля
			if (title) existingInstruction.title = title;
			if (titleImage) existingInstruction.titleImage = titleImage;
			if (author) existingInstruction.author = author;
			if (videoUrl || videoUrl === "") existingInstruction.videoUrl = videoUrl;
			if (body || body === "") existingInstruction.body = body;
			if (folderId) existingInstruction.folderId = folderId;
			await existingInstruction.save();
			return res.json(existingInstruction);
		} else {
			// Если документ не найден, создадим новый
			const newInstruction = new Instruction({ title, titleImage, author, videoUrl, body, folderId });
			await newInstruction.save();
			return res.json(newInstruction);
		}
	} catch (error) {
		res.json({ message: "Что-то не так с обновлением/созданием инструкции" });
	}
};

// Get Instruction By Id
export const getInstructionById = async (req, res) => {
	try {

		const instruction = await Instruction.findById(req.params.id)

		res.json(instruction)
	} catch (error) {
		res.json({ message: 'Инструкция по ID не найдена' })
	}
}

// Get All Instructions
export const getAllInstructions = async (req, res) => {
	try {

		const instructions = await Instruction.find().sort({ "title": 1 })

		if (!instructions) {
			return res.json({ message: "Инструкций нет" })
		}

		return res.json({ instructions })

	} catch (error) {
		res.json({ message: "Что-то не так с отображением инструкций" })
	}
}



export const getFolderInstructions = async (req, res) => {
	try {
		const insFolder = await InsFolder.findById(req.params.id)
		const insList = await Promise.all(
			insFolder?.instructions.map((instruction) => Instruction.findById(instruction))
		)

		const sortedInsList = insList.sort((a, b) => a.title.localeCompare(b.title));


		res.status(200).json({ folderInstructions: sortedInsList })
	} catch (error) {
		res.json({ message: error.message })
	}
}






// Delete One Instruction from DB
export const deleteInstruction = async (req, res) => {
	try {
		const instruction = await Instruction.findByIdAndDelete(req.params.id)
		if (!instruction) return res.json({ message: 'Такой инструкции нет' })

		// Delete instruction from folder
		await InsFolder.findByIdAndUpdate(instruction.folderId, { $pull: { instructions: instruction._id } }, { new: true })

		res.json({ message: 'Инструкция была удалена.' })
	} catch (error) {
		res.json({ message: 'Что-то не так с удалением инструкции.' })
	}
}





//Delete Instructions from DB
export const deleteInstructions = async (req, res) => {
	try {

		await Instruction.deleteMany()

		res.json({ message: "Инструкции удалены" })

	} catch (error) {
		res.json({ message: 'Что-то не так c удалением инструкций' })
	}
}
