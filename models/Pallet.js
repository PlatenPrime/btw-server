import mongoose from "mongoose";


const PalletSchema = new mongoose.Schema({
	title: { type: String, required: true },
	row: { type: mongoose.Schema.Types.ObjectId, ref: 'Row', required: true },
	poses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pos' }],
},
	{ timestamps: true },


)


export default mongoose.model("Pallet", PalletSchema);