import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
	artikul: String,
	change: {
		field: String,
		oldValue: mongoose.Schema.Types.Mixed,
		newValue: mongoose.Schema.Types.Mixed,
	},
	timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Log", LogSchema);