import mongoose from "mongoose";

const BoxSchema = new mongoose.Schema(
	{

		articuls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Art' }],
		index: {
			type: Number
		},
		date: String

	}
)

export default mongoose.model("Box", BoxSchema);