import mongoose from "mongoose";

const InstructionSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		titleImage: {
			type: String,
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		department: {
			type: String,
			required: true,
		},
		access: {
			type: String,
			required: true,
		},

	},
	{ timestamps: true },
)

export default mongoose.model("Instruction", InstructionSchema);
