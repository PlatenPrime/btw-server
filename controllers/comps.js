import Comp from '../models/Comp.js';


// Create One Comp
export async function createComp(req, res) {
	try {

		const compData = { ...req.body };

		const comp = new Comp(compData);

		await comp.save();


		console.log(comp)
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
			avail



		} = req.body;

		let existingComp = await Comp.findOne({ artikul });

		if (existingComp) {
			// Проверяем, были ли поля переданы в req.body, и обновляем только их
			if (size) existingComp.size = size;
			if (category) existingComp.category = category;
			if (subcategory) existingComp.subcategory = subcategory;
			if (prod) existingComp.prod = prod;
			if (competitorsLinks) existingComp.competitorsLinks = competitorsLinks;
			if (avail?.sharte) existingComp.avail.sharte = avail.sharte;
			if (avail?.btrade) existingComp.avail.btrade = avail.btrade;
			if (avail?.air) existingComp.avail.air = avail.air;
			if (avail?.yumi) existingComp.avail.yumi = avail.yumi;
			if (avail?.best) existingComp.avail.best = avail.best;
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
export async function deleteComp(req, res) {
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
