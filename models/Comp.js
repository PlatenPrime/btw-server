import mongoose from "mongoose";

const CompSchema = new mongoose.Schema(
	{
		artikul: {
			type: String,
			required: true,
			unique: true,
		},
		nameukr: String,
		prod: {
			type: String
		},
		category: String,
		subcategory: String,
		size: String,
		competitorsLinks: {
			sharteLink: String,
			yumiLink: String,
			airLink: String,
			bestLink: String,
		},
		avail: {
			btrade: Number,
			sharte: mongoose.Schema.Types.Mixed,
			yumi: Number,
			air: mongoose.Schema.Types.Mixed,
			best: mongoose.Schema.Types.Mixed,
		},
		price: {
			btrade: String,
			sharte: String,
			yumi: String,
			air: String,
			best: String,
		}


	}
)

export default mongoose.model("Comp", CompSchema);