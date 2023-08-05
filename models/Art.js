import mongoose from "mongoose";

const ArtSchema = new mongoose.Schema(
	{
		artikul: {
			type: String,
			required: true,

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


	}
)

export default mongoose.model("Art", ArtSchema);