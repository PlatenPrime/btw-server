

import Art from "../models/Art.js";
import Pallet from "../models/Pallet.js";
import Row from "../models/Row.js";




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
		const deletedPallet = await Pallet.findByIdAndDelete(req.params.id);

		// Найди где промисом удаляются все коробки на паллете или паллеты на ряду

		// Удаление ссылки на удаляемый объект Pallet из массива pallets объекта Row
		await Row.updateMany({ pallets: deletedPallet._id }, { $pull: { pallets: deletedPallet._id } });

		res.json(deletedPallet);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};