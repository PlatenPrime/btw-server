import mongoose from "mongoose";

const PosSchema = new mongoose.Schema(
	{
		pallet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pallet', required: true },
		palletTitle: String,
		rowTitle: String,
		artikul: String,
		quant: Number,
		boxes: Number,
		date: String,
		sklad: String,
		com: String

	}
)

export default mongoose.model("Pos", PosSchema);