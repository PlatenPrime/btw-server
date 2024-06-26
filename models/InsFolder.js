import mongoose from "mongoose";


const InsFolderSchema = new mongoose.Schema({
	title: { type: String, required: true },
	instructions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Instruction' }],

},
	{ timestamps: true },

)


export default mongoose.model("InsFolder", InsFolderSchema);