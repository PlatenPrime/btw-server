import Pos from '../models/Pos.js';
import Pallet from '../models/Pallet.js';

// Создание новой коробки и добавление её в объект Pallet
export const createPos = async (req, res) => {
	try {
		const { palletId, ...posData } = req.body;

		const pallet = palletId;

		const newPos = await Pos.create({ pallet, ...posData });

		const updatePallet = await Pallet.findById(palletId);
		if (!pallet) {
			return res.status(404).json({ message: 'Pallet not found' });
		}

		await Pallet.findByIdAndUpdate(
			updatePallet._id,
			{ $push: { poses: newPos._id } },
			{ new: true }
		);

		res.status(201).json(newPos);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get All Pallets

export const getAllPoses = async (req, res) => {
	try {
		const poses = await Pos.find();

		if (!poses || poses.length === 0) {
			return res.json({ message: 'Поз нет' });
		}

		res.json({ poses });
	} catch (error) {
		res.json({ message: error.message });
	}
};

// Получение позиции по ID
export const getPosById = async (req, res) => {
	try {
		const pos = await Pos.findById(req.params.id);
		if (!pos) {
			return res.status(404).json({ message: 'Pos not found' });
		}
		res.json(pos);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Редактирование объекта Pos по его ID
export const updatePos = async (req, res) => {
	try {
		const updatedPos = await Pos.findByIdAndUpdate(req.params.id, req.body, { new: true });
		res.json(updatedPos);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Удаление объекта Pos по его ID
export const deletePosById = async (req, res) => {
	try {
		const deletedPos = await Pos.findByIdAndDelete(req.params.id);

		// Обновление массива poses в объектах Pallet для удаления ссылки на удаляемую позицию
		await Pallet.updateMany({ poses: deletedPos._id }, { $pull: { poses: deletedPos._id } });

		res.json(deletedPos);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
