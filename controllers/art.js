import Art from "../models/Art.js";
import Pallet from "../models/Pallet.js";





//Create Art

export const createArt = async (req, res) => {
	try {
		const { title, zone, name } = req.body



		const newArt = new Art({
			title, zone, name
		})


		await newArt.save()

		return res.json(newArt)

	} catch (error) {
		res.json({ message: "Что-то не так с созданием арикула" })
	}
}








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
		res.json(art)

	} catch (error) {
		res.json({ message: 'Артикул по названию не найден' })
	}
}


// Get Art By Id

export const getById = async (req, res) => {
	try {
		console.log(req.params.id)
		const art = await Art.findById(req.params.id)
		res.json(art)
	} catch (error) {
		res.json({ message: 'Артикул по ID не найден' })
	}
}



// Remove Art

export const removeArt = async (req, res) => {
	try {
		const art = await Art.findByIdAndDelete(req.params.id)
		if (!art) return res.json({ message: 'Такого артикула нет' })



		res.json({ message: 'Артикул был удален.' })
	} catch (error) {
		res.json({ message: 'Что-то не так с удалением артикула.' })
	}
}



// Update arts by Zones Loading

// 

export const updateArtZone = async (req, res) => {
	try {
		const { title, zone, name } = req.body
		const art = await Art.findOne({ "title": title })

		art.zone = zone;
		art.name = name;

		await art.save();

		res.json(art)
	} catch (error) {
		res.json({ message: 'Что-то не так c обновлением данных артикула' })
	}
}


// Get Art Pallets

export const getArtPallets = async (req, res) => {
	try {
		const art = await Row.findById(req.params.id)
		const list = await Promise.all(
			art.pallets.map((pallet) => {
				return Pallet.findById(pallet)
			}),
		)
		res.json(list)
	} catch (error) {
		res.json({ message: 'Что-то пошло не так.' })
	}
}