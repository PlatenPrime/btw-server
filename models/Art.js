import mongoose from "mongoose";

const ArtSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String
		},
		zone: {
			type: String,
			required: true,
		},
		pallets: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Pallet",
			}
		]

	}
)

export default mongoose.model("Art", ArtSchema);