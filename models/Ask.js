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
		asker: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		solver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

	},
	{ timestamps: true },
)

export default mongoose.model("Ask", AskSchema);