import mongoose from "mongoose";

const InstructionSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		body: {
			type: Object,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		department: {
			type: String,
			required: true,
		}
	},
	{ timestamps: true },
)

export default mongoose.model("Instruction", InstructionSchema);
