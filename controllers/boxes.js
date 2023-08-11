import Box from '../models/Box.js';
import Pallet from '../models/Pallet.js';

// Создание новой коробки и добавление её в объект Pallet
export const createBox = async (req, res) => {
	try {
		const { palletId, ...boxData } = req.body;


		const pallet = palletId;

		const newBox = await Box.create({ pallet, ...boxData });

		const updatePallet = await Pallet.findById(palletId);
		if (!pallet) {
			return res.status(404).json({ message: 'Pallet not found' });
		}

		await Pallet.findByIdAndUpdate(
			updatePallet._id,
			{ $push: { boxes: newBox._id } },
			{ new: true }
		);



		res.status(201).json(newBox);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get All Pallets

export const getAllBoxes = async (req, res) => {
	try {
		const boxes = await Box.find()


		if (!boxes || boxes.length === 0) {
			return res.json({ message: 'Коробок нет' })
		}

		res.json({ boxes })
	} catch (error) {
		res.json({ message: error.message })
	}
}



// Получение коробки по ID
export const getBoxById = async (req, res) => {
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
export const updateBox = async (req, res) => {
	try {
		const updatedBox = await Box.findByIdAndUpdate(req.params.id, req.body, { new: true });
		res.json(updatedBox);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};



// Удаление объекта Box по его ID
export const deleteBoxById = async (req, res) => {
	try {
		const deletedBox = await Box.findByIdAndDelete(req.params.id);

		// Обновление массива boxes в объектах Pallet для удаления ссылки на удаляемую коробку
		await Pallet.updateMany({ boxes: deletedBox._id }, { $pull: { boxes: deletedBox._id } });

		res.json(deletedBox);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
