

import Art from "../models/Art.js";
import Pallet from "../models/Pallet.js";
import Row from "../models/Row.js";
import Box from "../models/Box.js";




// Создание нового объекта Pallet с вложенными объектами Box и добавление его в объект Row
export const createPallet = async (req, res) => {
	try {
		const { title, rowId } = req.body;

		const row = rowId

		const newPallet = await Pallet.create({ title, row });

		await Row.findByIdAndUpdate(
			rowId,
			{ $push: { pallets: newPallet._id } },
			{ new: true }
		);


		res.status(201).json(newPallet);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};


// Получение объекта Pallet по ID
export const getPalletById = async (req, res) => {
	try {


		const pallet = await Pallet.findById(req.params.id);

		if (!pallet) {
			return res.status(404).json({ message: 'Pallet not found' });
		}
		res.json(pallet);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};



// Редактирование объекта Pallet по его ID
export const updatePalletById = async (req, res) => {
	try {

		const { title, rowId } = req.body;
		const row = rowId


		const updatedPallet = await Pallet.findByIdAndUpdate(req.params.id, { title, row }, { new: true });
		res.json(updatedPallet);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Удаление объекта Pallet по его ID и обновление связанных Row
export const deletePallet = async (req, res) => {
	try {
		const deletedPallet = await Pallet.findById(req.params.id);

		if (!deletedPallet) {
			return res.status(404).json({ message: 'Pallet not found' });
		}

		// Получим все связанные объекты Box внутри этого Pallet
		const boxIds = deletedPallet.boxes;

		// Удаление связанных объектов Box
		await Box.deleteMany({ _id: { $in: boxIds } });

		// Удаление ссылки на удаляемый объект Pallet из массива pallets объекта Row
		await Row.updateMany({ pallets: deletedPallet._id }, { $pull: { pallets: deletedPallet._id } });

		// Удаление самого объекта Pallet
		await Pallet.findByIdAndDelete(req.params.id);

		res.json({ message: 'Pallet and associated data deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};