import mongoose from "mongoose";


const PalletSchema = new mongoose.Schema({
	title: { type: String, required: true },
	row: { type: mongoose.Schema.Types.ObjectId, ref: 'Row', required: true },
	positions: [{
		id: { type: Number, required: true },
		art: { type: String, required: true },
		pieces: { type: Number, required: true },
	}],
},
	{ timestamps: true },


)


export default mongoose.model("Pallet", PalletSchema);