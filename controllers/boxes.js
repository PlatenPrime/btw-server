import Box from '../models/Box.js';
import Pallet from '../models/Pallet.js';

// Создание новой коробки и добавление её в объект Pallet и Row
export const createBox = async (req, res) => {
	try {
		const { palletId, rowId, ...boxData } = req.body;

		const newBox = await Box.create(boxData);

		const pallet = await Pallet.findById(palletId);
		if (!pallet) {
			return res.status(404).json({ message: 'Pallet not found' });
		}

		const updatedPallet = await Pallet.findByIdAndUpdate(
			pallet._id,
			{ $push: { boxes: newBox._id } },
			{ new: true }
		);

		const updatedRow = await Row.findByIdAndUpdate(
			rowId,
			{ $push: { pallets: updatedPallet._id } },
			{ new: true }
		);

		res.status(201).json(newBox);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};




// Получение коробки по ID
export const getBoxOnID = async (req, res) => {
	try {
		const box = await Box.findById(req.params.id);
		if (!box) {
			return res.status(404).json({ message: 'Box not found' });
		}
		res.json(box);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};





// Редактирование объекта Box по его ID
export const editBox = async (req, res) => {
	try {
		const updatedBox = await Box.findByIdAndUpdate(req.params.id, req.body, { new: true });
		res.json(updatedBox);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Удаление объекта Box по его ID
export const deleteBox = async (req, res) => {
	try {
		const deletedBox = await Box.findByIdAndDelete(req.params.id);

		// Обновление массива boxes в объектах Pallet для удаления ссылки на удаляемую коробку
		await Pallet.updateMany({ boxes: deletedBox._id }, { $pull: { boxes: deletedBox._id } });

		res.json(deletedBox);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
