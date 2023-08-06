

import Art from "../models/Art.js";
import Pallet from "../models/Pallet.js";
import Row from "../models/Row.js";




// Создание нового объекта Pallet с вложенными объектами Box и добавление его в объект Row
export const createPalletWithBoxes = async (req, res) => {
	try {
		const { rowId, boxes, ...palletData } = req.body;

		const newPallet = await Pallet.create(palletData);

		await Row.findByIdAndUpdate(
			rowId,
			{ $push: { pallets: newPallet._id } },
			{ new: true }
		);

		await Box.updateMany({ _id: { $in: boxes } }, { $push: { pallets: newPallet._id } });

		res.status(201).json(newPallet);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};


// Получение объекта Pallet по ID
export const getPalletOnID = async (req, res) => {
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
export const editPallet = async (req, res) => {
	try {
		const updatedPallet = await Pallet.findByIdAndUpdate(req.params.id, req.body, { new: true });
		res.json(updatedPallet);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Удаление объекта Pallet по его ID и обновление связанных Row
export const deletePallet = async (req, res) => {
	try {
		const deletedPallet = await Pallet.findByIdAndDelete(req.params.id);

		// Удаление ссылок на удаляемый объект Pallet из массивов pallets объектов Box
		await Box.updateMany({ pallets: deletedPallet._id }, { $pull: { pallets: deletedPallet._id } });

		// Удаление ссылки на удаляемый объект Pallet из массива pallets объекта Row
		await Row.updateMany({ pallets: deletedPallet._id }, { $pull: { pallets: deletedPallet._id } });

		res.json(deletedPallet);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};