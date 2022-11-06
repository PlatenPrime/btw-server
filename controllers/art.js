import Art from "../models/Art.js";
import Pallet from "../models/Pallet.js";
















// Get All Arts 


export const getAllArts = async (req, res) => {
	try {

		const arts = await Art.find().sort({ "title": 1 })

		if (!arts) {
			return res.json({ message: "Артикулов нет" })
		}

		return res.json({ arts })

	} catch (error) {
		res.json({ message: "Что-то не так с отображением артикулов" })
	}
}


// Get Art By Title

export const getByTitle = async (req, res) => {
	try {
		const { title } = req.body
		const art = await Art.findOne({ "title": title })
		console.log(art);
		res.json(art)

	} catch (error) {
		res.json({ message: 'Артикул не найден' })
	}
}
