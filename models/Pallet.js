import mongoose from "mongoose";


const PalletSchema = new mongoose.Schema({
	title: { type: String, required: true },
	row: { type: mongoose.Schema.Types.ObjectId, ref: 'Row', required: true },
	boxes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Box' }],
},
	{ timestamps: true },


)


export default mongoose.model("Pallet", PalletSchema);