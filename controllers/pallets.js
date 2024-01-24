import Art from "../models/Art.js";
import Pallet from "../models/Pallet.js";
import Row from "../models/Row.js";
import Pos from "../models/Pos.js";

// Создание нового объекта Pallet с вложенными объектами Pos и добавление его в объект Row
export const createPallet = async (req, res) => {
	try {
		const { title, rowId, com } = req.body;

		const row = rowId;

		const newPallet = await Pallet.create({ title, row, com });

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

		res.status(200).json({ pallets });
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
		const { title, rowId, com } = req.body;
		const row = rowId;

		const updatedPallet = await Pallet.findByIdAndUpdate(req.params.id, { title, row, com }, { new: true });
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


// Очищение паллеты от всех позиций на ней


export const clearPalletById = async (req, res) => {
	try {

		const clearedPallet = await Pallet.findById(req.params.id);

		if (!clearedPallet) {
			return res.status(404).json({ message: "Pallet not found" });
		}


		// Получим все связанные объекты Pos внутри этого Pallet
		const posIds = clearedPallet.poses;

		// Удаление связанных объектов Pos
		await Pos.deleteMany({ _id: { $in: posIds } });


		clearedPallet.poses = [];

		await clearedPallet.save();


		res.json({ message: 'Pallet and associated data cleared successfully' });


	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

// Переместить содержимое паллеты на новое место


export const movePalletContent = async (req, res) => {

	// Очищение паллеты от всех позиций на ней
	const clearPalletFunction = async (pallet) => {

		const posIds = pallet.poses;



		// Удаление связанных объектов Pos
		await Pos.deleteMany({ _id: { $in: posIds } });

		pallet.poses = [];
		await pallet.save();
	};




	try {








		const { currentPalletId, targetPalletId } = req.body;

		// Проверим, существуют ли указанные паллеты
		const currentPallet = await Pallet.findById(currentPalletId);
		const targetPallet = await Pallet.findById(targetPalletId);

		const targetRowTitle = await Row.findById(targetPallet?.row)

		if (!currentPallet || !targetPallet) {
			return res.status(404).json({ message: "One or both of the pallets not found" });
		}

		// Очистка второй паллеты
		await clearPalletFunction(targetPallet);

		// Получим все связанные объекты Pos внутри текущей паллеты
		const posIdsToMove = currentPallet.poses;

		// Обновление информации о паллете в позициях, которые переносятся
		await Pos.updateMany({ _id: { $in: posIdsToMove } }, { pallet: targetPalletId, palletTitle: targetPalletId?.title, rowTitle: targetRowTitle });

		// Добавим перемещенные позиции в целевую паллету
		targetPallet.poses = posIdsToMove;
		await targetPallet.save();


		// Удаление связанных объектов Pos из текущей паллеты
		currentPallet.poses = [];

		await currentPallet.save();

		res.json({ message: "Pallet content moved successfully" });
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



// Найти паллеты по артикулу
export const findPalletsByArtikul = async (req, res) => {
	try {
		const { artikul } = req.params; // Получаем артикул из параметров запроса

		// Ищем все позиции с указанным артикулом
		const positions = await Pos.find({ artikul });

		// Получаем уникальные идентификаторы паллет, содержащих эти позиции
		const palletIds = positions.map(pos => pos.pallet);

		// Ищем паллеты по идентификаторам
		const pallets = await Pallet.find({ _id: { $in: palletIds } });

		res.json({ pallets });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};