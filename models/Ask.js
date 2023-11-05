import mongoose from "mongoose";

const AskSchema = new mongoose.Schema(
	{
		artikul: {
			type: String,
			required: true,
			unique: true,
		},
		quant: String,
		completed: Boolean,
		asker: mongoose.Schema.Types.ObjectId, ref: 'User',
		solver: mongoose.Schema.Types.ObjectId, ref: 'User',

	}
)

export default mongoose.model("Ask", AskSchema);