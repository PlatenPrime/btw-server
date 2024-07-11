import Comp from '../models/Comp.js';
import fetch from 'node-fetch';
import cheerio from 'cheerio';


import { getArtDataComp, updateArtDataComp, updateAllArtDataComps, getArtDataSharte, getArtDataAir, getArtDataYumi, getArtDataBest, getArtDataBtrade } from "../utils/comps/index.js";
import { sendMessageToUser } from '../utils/sendMessagesTelegram.js';


// Create One Comp
export async function createComp(req, res) {
	try {

		const {
			artikul,
			prod,
			size,
			category,
			subcategory,
			nameukr,
			competitorsLinks,
		} = { ...req.body };



		const compData = {
			artikul,
			prod,
			size,
			category,
			subcategory,
			nameukr,
			competitorsLinks,
		}


		const comp = new Comp(compData);

		await comp.save();

		res.status(201).json(comp);
	} catch (error) {
		res.status(400).json({ error: 'Failed to create comp' });
	}
}

// Create or Update One Comp
export async function updateOrCreateComp(req, res) {
	try {
		const { size,
			category,
			subcategory,
			prod,
			artikul,
			nameukr,
			competitorsLinks,
			price,
			avail,
			abc

		} = req.body;

		let existingComp = await Comp.findOne({ artikul });

		if (existingComp) {
			// Проверяем, были ли поля переданы в req.body, и обновляем только их
			if (size) existingComp.size = size;
			if (category) existingComp.category = category;
			if (subcategory) existingComp.subcategory = subcategory;
			if (prod) existingComp.prod = prod;
			if (abc) existingComp.abc = abc;
			if (competitorsLinks) existingComp.competitorsLinks = competitorsLinks;
			if (avail?.sharte || avail?.sharte === false) existingComp.avail.sharte = avail.sharte;
			if (avail?.btrade || avail?.btrade === 0) existingComp.avail.btrade = avail.btrade;
			if (avail?.air || avail?.air === false) existingComp.avail.air = avail.air;
			if (avail?.yumi || avail?.yumi === 0 || avail?.yumi === "") existingComp.avail.yumi = avail.yumi;
			if (avail?.best || avail?.best === false) existingComp.avail.best = avail.best;
			if (price?.sharte) existingComp.price.sharte = price.sharte;
			if (price?.btrade) existingComp.price.btrade = price.btrade;
			if (price?.air) existingComp.price.air = price.air;
			if (price?.yumi) existingComp.price.yumi = price.yumi;
			if (price?.best) existingComp.price.best = price.best;


			await existingComp.save();
			return res.status(200).json(existingComp);
		} else {
			// Создаем новый объект Comp и сохраняем только переданные поля
			const newComp = new Comp({
				size,
				category,
				subcategory,
				prod,
				artikul,
				nameukr,
				competitorsLinks,
				abc,

			});
			await newComp.save();
			return res.status(200).json(newComp);
		}
	} catch (error) {
		console.error('Error in updateOrCreateComp:', error);
		res.status(400).json({ error: 'Failed to create/update comp' });
	}
}

// Get Comp By Id
export async function getCompById(req, res) {
	try {
		const comp = await Comp.findById(req.params.id);
		console.log(comp)
		if (!comp) {
			res.status(404).json({ error: 'Comp not found' });
		} else {
			res.status(200).json(comp);
		}
	} catch (error) {
		res.status(400).json({ error: 'Failed to get comp' });
	}
}


// Get Comp By Artikul 

export async function getCompByArtikul(req, res) {
	try {
		const artikul = req.params.artikul;
		const comp = await Comp.findOne({ artikul });

		if (!comp) {
			return res.status(404).json({ message: "Объект не найден" });
		}

		res.json(comp);
	} catch (error) {
		res.status(500).json({ message: "Ошибка сервера" });
	}
}






// Get All Comps
export async function getAllComps(req, res) {
	try {
		const comps = await Comp.find().sort({ "artikul": 1 });
		res.status(200).json(comps);
	} catch (error) {
		res.status(400).json({ error: 'Failed to get comps' });
	}
}

// Delete One Comp from DB
export async function deleteCompById(req, res) {
	try {
		const comp = await Comp.findByIdAndDelete(req.params.id);
		if (!comp) {
			res.status(404).json({ error: 'Comp not found' });
		} else {
			res.status(200).json({ message: 'Comp deleted successfully' });
		}
	} catch (error) {
		res.status(400).json({ error: 'Failed to delete comp' });
	}
}

// Delete All Comps from DB
export async function deleteAllComps(req, res) {
	try {
		await Comp.deleteMany();
		res.status(200).json({ message: 'All comps deleted successfully' });
	} catch (error) {
		res.status(400).json({ error: 'Failed to delete comps' });
	}
}



export async function getUpdatedArtDataComp(req, res) {
	try {
		const { artikul } = req.params;
		const comp = await updateArtDataComp(artikul);
		res.status(200).json(comp);
		sendMessageToUser(
			`Артикул ${artikul} успішно проаналізовано!`, "555196992")
	} catch (error) {
		res.status(400).json({ error: 'Failed to update comp' });
	}
}


export async function getUpdatedAllArtDataComps(req, res) {
	try {
		await updateAllArtDataComps();
		res.status(200).json({ message: 'All comps updated successfully' });
	} catch (error) {
		res.status(400).json({ error: 'Failed to update comps' });
	}
}




export async function getLinkPage(req, res) {

	try {
		const { link } = req.params; // Получаем ссылку из параметров маршрута

		// Декодируем ссылку
		const decodedLink = decodeURIComponent(link);

		console.log(decodedLink);

		// Выполняем GET-запрос по декодированной ссылке
		const response = await fetch(decodedLink, {
			cache: 'no-store', // Запрещаем кэширование
		});

		if (response.ok) {
			const htmlString = await response.text();
			const jsonResponse = { html: htmlString };

			res.status(200).json(jsonResponse);
		} else {
			res.status(404).json({ error: 'Страница не найдена' });
		}



	} catch (error) {
		console.error('Error in getLinkPage:', error);
		res.status(500).json({ error: 'Ошибка сервера' });
	}
}