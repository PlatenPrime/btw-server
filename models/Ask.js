import mongoose from "mongoose";

const AskSchema = new mongoose.Schema(
	{
		artikul: {
			type: String,
			required: true,
		},
		quant: Number,
		status: String,
		actions: [{ type: String }],
		asker: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		solver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

	},
	{ timestamps: true },
)

export default mongoose.model("Ask", AskSchema);