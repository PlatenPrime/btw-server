import Instruction from "../models/Ins.js";

// Create One Instruction
export const createInstruction = async (req, res) => {
	try {
		const { title, titleImage, author, video, body, category, department, access } = req.body

		const newInstruction = new Instruction({ title, titleImage, author, video, body, category, department, access })

		await newInstruction.save()

		return res.json(newInstruction)

	} catch (error) {
		res.json({ message: "Что-то не так с созданием инструкции" })
	}
}

//Update One Instruction
export const updateOrCreateInstruction = async (req, res) => {
	try {
		const { title, titleImage, author, video, body, category, department, access  } = req.body;

		// Попробуем найти документ по title
		let existingInstruction = await Instruction.findById(req.params.id);

		if (existingInstruction) {
			// Если документ найден, обновим его поля
			if (title) existingInstruction.title = title;
			if (titleImage) existingInstruction.titleImage = titleImage;
			if (author) existingInstruction.author = author;
			if (video) existingInstruction.video = video;
			if (body) existingInstruction.body = body;
			if (category) existingInstruction.category = category;
			if (department) existingInstruction.department = department;
			if (access) existingInstruction.access = access;
			await existingInstruction.save();
			return res.json(existingInstruction);
		} else {
			// Если документ не найден, создадим новый
			const newInstruction = new Instruction({ title, titleImage, author, video, body, category, department, access });
			await newInstruction.save();
			return res.json(newInstruction);
		}
	} catch (error) {
		res.json({ message: "Что-то не так с обновлением/созданием инструкции" });
	}
};

// Get Instruction By Id
export const getById = async (req, res) => {
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

// Delete One Instruction from DB
export const deleteInstruction = async (req, res) => {
	try {
		const instruction = await Instruction.findByIdAndDelete(req.params.id)
		if (!instruction) return res.json({ message: 'Такой инструкции нет' })

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
