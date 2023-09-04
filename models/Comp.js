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
		competitorsLinks: {
			sharteLink: String
		},
		avail: {
			btrade: Number,
			sharte: Boolean

		},
		price: {
			btrade: String,
			sharte: String
		}


	}
)

export default mongoose.model("Comp", CompSchema);