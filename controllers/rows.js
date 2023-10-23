import Row from "../models/Row.js";
import Pallet from "../models/Pallet.js";
import Pos from "../models/Pos.js";

// Создание нового объекта Row
export const createRow = async (req, res) => {
	try {
		const { title } = req.body;

		const newRow = new Row({
			title
		});

		await newRow.save();

		return res.json(newRow);
	} catch (error) {
		res.json({ message: "Что-то не так с созданием ряда" });
	}
};

// Get All Rows

export const getAllRows = async (req, res) => {
	try {
		const rows = await Row.find().sort({ "title": 1 });

		if (!rows) {
			return res.json({ message: 'Рядов нет' });
		}

		res.json({ rows });
	} catch (error) {
		res.json({ message: 'Что-то не так с отображением рядов.' });
	}
};

// Получение объекта Row по ID
export const getById = async (req, res) => {
	try {
		const row = await Row.findByIdAndUpdate(req.params.id);
		res.json(row);
	} catch (error) {
		res.json({ message: 'Ряд не найден' });
	}
};

// Delete Row

export const deleteRowById = async (req, res) => {
	try {
		const rowId = req.params.id;

		// Найдем объект Row
		const row = await Row.findById(rowId);

		if (!row) {
			return res.status(404).json({ message: 'Row not found' });
		}

		// Получим все связанные объекты Pallet внутри этой Row
		const palletIds = row.pallets;

		// Удаление связанных объектов Pos сначала
		for (const palletId of palletIds) {
			const pallet = await Pallet.findById(palletId);

			if (!pallet) {
				continue; // Можно также выбросить ошибку, если требуется
			}

			const posIds = pallet.poses;
			await Pos.deleteMany({ _id: { $in: posIds } });
		}

		// Удаление связанных объектов Pallet
		await Pallet.deleteMany({ _id: { $in: palletIds } });

		// Удаление самого объекта Row
		await Row.findByIdAndDelete(rowId);

		res.json({ message: 'Row and associated data deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: 'Error deleting Row', error: error.message });
	}
};

// Update Row

export const updateRowById = async (req, res) => {
	try {
		const _id = req.params.id;
		const { title } = req.body;
		const row = await Row.findById(_id);

		row.title = title;

		await row.save();

		res.json(row);
	} catch (error) {
		res.json({ message: error.message });
	}
};

// Get Row Pallets

export const getRowPallets = async (req, res) => {
	try {
		const row = await Row.findById(req.params.id);
		const list = await Promise.all(
			row.pallets.map((pallet) => {
				return Pallet.findById(pallet);
			}),
		);

		// Сортировка массива list по полю title
		list.sort((a, b) => {
			const partsA = a.title.split('-');
			const partsB = b.title.split('-');

			for (let i = 0; i < partsA.length; i++) {
				const numA = parseInt(partsA[i]);
				const numB = parseInt(partsB[i]);

				if (numA < numB) {
					return -1;
				}
				if (numA > numB) {
					return 1;
				}
			}
			return 0;
		});
		res.json(list);
	} catch (error) {
		res.json({ message: error.message });
	}
};
