import mongoose from "mongoose";


const RowSchema = new mongoose.Schema({
	title: { type: String, required: true },
	pallets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pallet' }],
},


)


export default mongoose.model("Row", RowSchema);