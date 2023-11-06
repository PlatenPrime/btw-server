import Ask from "../models/Ask.js";


// Create the ask

export const createAsk = async (req, res) => {

	try {
		const { artikul, quant, completed, asker, solver } = req.body
		const newAsk = new Ask({ artikul, quant, completed, asker, solver })

		await newAsk.save()

		return res.json(newAsk)

	} catch (error) {
		res.json({ message: "Ошибка создания запроса на снятие" })
	}
}


// Get All Asks

export const getAllAsks = async (req, res) => {
	try {
		const asks = await Ask.find().sort('createdAt');

		if (!asks || asks.length === 0) {
			return res.json({ message: 'Запросов на снятие нет' });
		}

		res.json({ asks });
	} catch (error) {
		res.json({ message: error.message });
	}
};


// Получение объекта Ask по ID
export const getAskById = async (req, res) => {
	try {
		const ask = await Ask.findById(req.params.id);

		if (!ask) {
			return res.status(404).json({ message: 'Ask not found' });
		}
		res.json(ask);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};


// Редактирование объекта Ask по его ID
export const updateAskById = async (req, res) => {
	try {
		const updateData = req.body;


		const updatedAsk = await Ask.findByIdAndUpdate(req.params.id, updateData, { new: true });
		res.json(updatedAsk);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};


// Delete Ask from DB

export const deleteAsk = async (req, res) => {
	try {
		const ask = await Ask.findByIdAndDelete(req.params.id)
		if (!ask) return res.json({ message: 'Такого запроса на снятие нет' })

		res.json({ message: 'Запрос на снятие был удален.' })


	} catch (error) {
		res.json({ message: 'Что-то не так с удалением запроса на снятие.' })
	}
}
