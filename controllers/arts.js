import Art from "../models/Art.js";
import * as XLSX from 'xlsx';
import fs from 'fs';






//Create One Articul

export const createArt = async (req, res) => {
	try {
		const { artikul, zone, nameukr, namerus } = req.body

		const newArt = new Art({ artikul, zone, nameukr, namerus })


		await newArt.save()

		return res.json(newArt)

	} catch (error) {
		res.json({ message: "Что-то не так с созданием артикула" })
	}
}


// Create or Update One Articul

export const updateOrCreateArt = async (req, res) => {
	try {
		const { artikul, zone, nameukr, namerus } = req.body;

		// Попробуем найти документ по artikul
		let existingArt = await Art.findOne({ artikul });

		if (existingArt) {
			// Если документ найден, обновим его поля
			existingArt.zone = zone;
			existingArt.nameukr = nameukr;
			existingArt.namerus = namerus;
			await existingArt.save();
			return res.json(existingArt);
		} else {
			// Если документ не найден, создадим новый
			const newArt = new Art({ artikul, zone, nameukr, namerus });
			await newArt.save();
			return res.json(newArt);
		}
	} catch (error) {
		res.json({ message: "Что-то не так с обновлением/созданием артикула" });
	}
};


// Get Articul By Id

export const getById = async (req, res) => {
	try {

		const art = await Art.findById(req.params.id)

		res.json(art)
	} catch (error) {
		res.json({ message: 'Артикул по ID не найден' })
	}
}



// Get All Articuls


export const getAllArts = async (req, res) => {
	try {

		const arts = await Art.find().sort({ "artikul": 1 })

		if (!arts) {
			return res.json({ message: "Артикулов нет" })
		}

		return res.json({ arts })

	} catch (error) {
		res.json({ message: "Что-то не так с отображением артикулов" })
	}
}



// Remove One Articul from DB

export const removeArt = async (req, res) => {
	try {
		const art = await Art.findByIdAndDelete(req.params.id)
		if (!art) return res.json({ message: 'Такого артикула нет' })



		res.json({ message: 'Артикул был удален.' })
	} catch (error) {
		res.json({ message: 'Что-то не так с удалением артикула.' })
	}
}


//Delete Articuls from DB


export const deleteArticuls = async (req, res) => {
	try {

		await Art.deleteMany()

		res.json({ message: "Артикулы удалены" })


	} catch (error) {
		res.json({ message: 'Что-то не так c обновлением данных артикулов' })
	}
}


// Download Excel With Artikuls
export const downloadExcelArtikuls = async (req, res) => {

	try {
		const arts = await Art.find().sort({ "artikul": 1 })
		// Создание новой книги Excel
		const workbook = XLSX.utils.book_new();
		// Преобразование JSON в массив данных
		const data = [arts];
		// Создание листа Excel
		const ws = XLSX.utils.json_to_sheet(data);
		// Добавление листа к книге
		XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');
		// Генерация временного имени файла
		const filename = `output_${Date.now()}.xlsx`;
		// Сохранение книги в файл
		XLSX.writeFile(workbook, filename);

		// Отправка файла как ответ на запрос
		res.download(filename, (err) => {
			if (err) {
				console.error(err);
			} else {
				// Удаление временного файла после отправки
				fs.unlinkSync(filename);
			}
		});



	} catch (error) {
		console.error(err);
	}



}


