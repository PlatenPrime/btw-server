import Art from "../models/Art.js";
import Pallet from "../models/Pallet.js";
import Row from "../models/Row.js";
import Pos from "../models/Pos.js";

// Создание нового объекта Pallet с вложенными объектами Pos и добавление его в объект Row
export const createPallet = async (req, res) => {
	try {
		const { title, rowId } = req.body;

		const row = rowId;

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

// Get All Pallets

export const getAllPallets = async (req, res) => {
	try {
		const pallets = await Pallet.find().sort('title');

		if (!pallets || pallets.length === 0) {
			return res.json({ message: 'Паллет нет' });
		}

		res.json({ pallets });
	} catch (error) {
		res.json({ message: error.message });
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
		const row = rowId;

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

		// Получим все связанные объекты Pos внутри этого Pallet
		const posIds = deletedPallet.poses;

		// Удаление связанных объектов Pos
		await Pos.deleteMany({ _id: { $in: posIds } });

		// Удаление ссылки на удаляемый объект Pallet из массива pallets объекта Row
		await Row.updateMany({ pallets: deletedPallet._id }, { $pull: { pallets: deletedPallet._id } });

		// Удаление самого объекта Pallet
		await Pallet.findByIdAndDelete(req.params.id);

		res.json({ message: 'Pallet and associated data deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get Pallet Poses

export const getPalletPoses = async (req, res) => {
	try {
		const pallet = await Pallet.findById(req.params.id)
		const posList = await Promise.all(
			pallet.poses.map((pos) => {
				return Pos.findById(pos)
			}),
		)
		res.json({ poses: posList })
	} catch (error) {
		res.json({ message: error.message })
	}
}
