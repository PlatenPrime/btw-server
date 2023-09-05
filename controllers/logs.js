import Log from "../models/Log.js";




// Create New Log

export async function createLog(req, res) {
	try {

		// const logData = { ...req.body };

		const { artikul, changes } = req.body;


		const log = new Log({
			artikul,
			changes,
		})

		await log.save();
		res.status(201).json(log)

	} catch (error) {
		console.error('Error creating log:', error);
	}
}



// Get All Logs
export async function getAllLogs(req, res) {
	try {
		const logs = await Log.find();
		res.status(200).json(logs);
	} catch (error) {
		res.status(400).json({ error: 'Failed to get logs' });
	}
}