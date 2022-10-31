

import Pallet from "../models/Pallet.js";
import Row from "../models/Row.js";




//Create Pallet

export const createPallet = async (req, res) => {
	try {
		const { title, positions, rowId } = req.body

		const row = rowId;

		const newPallet = new Pallet({
			title, positions, row
		})


		await newPallet.save()

		try {
			await Row.findByIdAndUpdate(rowId, {
				$push: { pallets: newPallet._id },
			})
		} catch (error) {
			console.log(error)
		}


		return res.json(newPallet)

	} catch (error) {
		res.json({ message: "Что-то не так с паллетой" })
	}
}


// Get All Pallets

export const getAllPallets = async (req, res) => {
	try {
		const pallets = await Pallet.find().sort('-createdAt')


		if (!pallets) {
			return res.json({ message: 'Паллет нет' })
		}

		res.json({ pallets })
	} catch (error) {
		res.json({ message: 'Что-то не так с отображением паллет.' })
	}
}


// Get Pallet By Id
export const getById = async (req, res) => {
	try {
		const pallet = await Pallet.findByIdAndUpdate(req.params.id)
		res.json(pallet)
	} catch (error) {
		res.json({ message: 'Паллета не найдена' })
	}
}







// Remove pallet
export const removePallet = async (req, res) => {
	try {

		const pallet = await Pallet.findById(req.params.id)


		await Row.findByIdAndUpdate(pallet.row, {
			$pull: { pallets: req.params.id },
		})



		const palletDelete = await Pallet.findByIdAndDelete(req.params.id)
		if (!palletDelete) return res.json({ message: 'Такой паллеты не существует' })






		res.json({ message: 'Паллета была удалена.' })
	} catch (error) {
		res.json({ message: 'Что-то не так с удалением паллеты.' })
	}
}


// Update pallet
export const updatePallet = async (req, res) => {
	try {
		const { title, positions, _id } = req.body
		const pallet = await Pallet.findById(_id)


		pallet.title = title;
		pallet.positions = positions;

		await pallet.save()

		res.json(pallet)
	} catch (error) {
		res.json({ message: 'Что-то не так c редактированием паллеты' })
	}
}