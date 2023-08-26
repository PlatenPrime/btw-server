import Comp from '../models/Comp.js';


// Create One Comp
export async function createComp(req, res) {
	try {

		const { artikul, prod, competitorsLinks } = req.body
		const comp = new Comp({ artikul, prod, competitorsLinks });

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
		const { artikul, prod, competitorsLinks } = req.body;
		const filter = { artikul };
		const update = { prod, competitorsLinks };
		const comp = await Comp.findOneAndUpdate(filter, update, {
			new: true,
			upsert: true,
		});
		res.status(200).json(comp);
	} catch (error) {
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

// Get All Comps
export async function getAllComps(req, res) {
	try {
		const comps = await Comp.find();
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
