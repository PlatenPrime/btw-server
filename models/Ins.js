import mongoose from "mongoose";

const InstructionSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		titleImage: {
			type: String,
			
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			
		},
		videoUrl: {
			type: String,
			// required: true,
		},
		body: {
			type: String,
			// required: true,
		},
		folderId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "InsFolder",
		},


	},
	{ timestamps: true },
)

export default mongoose.model("Instruction", InstructionSchema);
