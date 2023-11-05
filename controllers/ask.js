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