import Pos from '../models/Pos.js';
import Pallet from '../models/Pallet.js';
import Row from '../models/Row.js';

// Создание новой коробки и добавление её в объект Pallet
export const createPos = async (req, res) => {
	try {
		const { palletId, ...posData } = req.body;

		const pallet = palletId;

		const palletDB = await Pallet.findById(palletId);
		const palletTitle = palletDB?.title
		const row = await Row.findById(palletDB?.row)
		const rowTitle = row?.title


		const newPos = await Pos.create({
			pallet,
			palletTitle,
			rowTitle,
			...posData
		});

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


// Найти позиции по артикулу
export const getPosesByArtikul = async (req, res) => {
	try {
		const { artikul } = req.params; // Получаем артикул из параметров запроса

		// Ищем все позиции с указанным артикулом
		const positions = await Pos.find({ artikul });

		res.json({ positions });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};


// Добавить всем позициям  поля rowTitle и palletTitle и заполнить их

export const addTitles = async (req, res) => {
	try {

		const poses = await Pos.find();

		for (let pos of poses) {

			const pallet = await Pallet.findById(pos.pallet);
			const palletTitle = pallet?.title
			const row = await Row.findById(pallet?.row)
			const rowTitle = row?.title

			await Pos.findByIdAndUpdate(pos.id, {
				palletTitle: palletTitle,
				rowTitle: rowTitle,

			}, { new: true });

			console.log(`Обновление поизиции ${pos.artikul} завершено. 
Ряд: ${rowTitle}, паллета: ${palletTitle}
`);

		}

		console.log("Добавление всех тайтлов закончено!");



	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}