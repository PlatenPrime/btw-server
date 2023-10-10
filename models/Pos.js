import mongoose from "mongoose";

const PosSchema = new mongoose.Schema(
	{
		pallet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pallet', required: true },
		articul: String,
		quant: Number,
		box: String,
		date: String

	}
)

export default mongoose.model("Pos", PosSchema);