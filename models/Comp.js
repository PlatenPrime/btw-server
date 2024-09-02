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
			aeroLink: String,
			balunLink: String,
			svyatoLink: String,
			ideaLink: String,
		},
		avail: {
			btrade: Number,
			sharte: mongoose.Schema.Types.Mixed,
			yumi: mongoose.Schema.Types.Mixed,
			air: mongoose.Schema.Types.Mixed,
			best: mongoose.Schema.Types.Mixed,
			aero: mongoose.Schema.Types.Mixed,
			balun: mongoose.Schema.Types.Mixed,
			svyato: mongoose.Schema.Types.Mixed,
			idea: mongoose.Schema.Types.Mixed,

		},
		price: {
			btrade: String,
			sharte: String,
			yumi: String,
			air: String,
			best: String,
			aero: String,
			balun: String,
			svyato: String,
			idea: String,
		},
		abc: String,


	}
)

export default mongoose.model("Comp", CompSchema);