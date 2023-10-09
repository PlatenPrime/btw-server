import mongoose from "mongoose";

const PosSchema = new mongoose.Schema(
	{
		pallet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pallet', required: true },
		articuls: mongoose.Schema.Types.Object,
		box: String,
		date: String

	}
)

export default mongoose.model("Pos", PosSchema);