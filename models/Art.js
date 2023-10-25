import mongoose from "mongoose";

const ArtSchema = new mongoose.Schema(
	{
		artikul: {
			type: String,
			required: true,
			unique: true,
		},
		nameukr: {
			type: String
		},
		namerus: {
			type: String
		},
		zone: {
			type: String,
			required: true,
		},
		limit: {
			type: Number
		}


	}
)

export default mongoose.model("Art", ArtSchema);