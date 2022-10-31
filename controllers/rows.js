

import Row from "../models/Row.js";
import Pallet from "../models/Pallet.js";





//Create Row

export const createRow = async (req, res) => {
	try {
		const { title, pallets } = req.body



		const newRow = new Row({
			title, pallets
		})


		await newRow.save()

		return res.json(newRow)

	} catch (error) {
		res.json({ message: "Что-то не так с созданием ряда" })
	}
}


// Get All Rows

export const getAllRows = async (req, res) => {
	try {
		const rows = await Row.find().sort('-createdAt')


		if (!rows) {
			return res.json({ message: 'Рядов нет' })
		}

		res.json({ rows })
	} catch (error) {
		res.json({ message: 'Что-то не так с отображением рядов.' })
	}
}


// Get Row By Id
export const getById = async (req, res) => {
	try {
		const row = await Row.findByIdAndUpdate(req.params.id)
		res.json(row)
	} catch (error) {
		res.json({ message: 'Ряд не найден' })
	}
}


// Remove row

export const removeRow = async (req, res) => {
	try {
		const row = await Row.findByIdAndDelete(req.params.id)
		if (!row) return res.json({ message: 'Такого ряда не существует' })



		res.json({ message: 'Ряд был удален.' })
	} catch (error) {
		res.json({ message: 'Что-то не так с удалением ряда.' })
	}
}


// Update row

export const updateRow = async (req, res) => {
	try {
		const { title, _id } = req.body
		const row = await Row.findById(_id)


		row.title = title;

		await row.save()

		res.json(row)
	} catch (error) {
		res.json({ message: 'Что-то не так c редактированием ряда' })
	}
}


// Get Row Pallets

export const getRowPallets = async (req, res) => {
	try {
		const row = await Row.findById(req.params.id)
		const list = await Promise.all(
			row.pallets.map((pallet) => {
				return Pallet.findById(pallet)
			}),
		)
		res.json(list)
	} catch (error) {
		res.json({ message: 'Что-то пошло не так.' })
	}
}