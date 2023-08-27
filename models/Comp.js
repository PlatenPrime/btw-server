import mongoose from "mongoose";

const CompSchema = new mongoose.Schema(
	{
		artikul: {
			type: String,
			required: true,
			unique: true,
		},
		prod: {
			type: String
		},
		competitorsLinks: {
			sharteLink: String
		},
		availability: Boolean,
		price: String,


	}
)

export default mongoose.model("Comp", CompSchema);