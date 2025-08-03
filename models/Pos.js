import { model, Schema } from "mongoose";

const palletSubdocumentSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    sector: String,
  },
  { _id: false }
);

const rowSubdocumentSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
  },
  { _id: false }
);

const PosSchema = new Schema({
  pallet: {
    type: Schema.Types.ObjectId,
    ref: "Pallet",
    required: true,
  },
  row: { type: Schema.Types.ObjectId, ref: "Row", required: true },
  palletData: palletSubdocumentSchema,
  rowData: rowSubdocumentSchema,
  palletTitle: String,
  rowTitle: String,
  artikul: String,
  nameukr: String,
  quant: Number,
  boxes: Number,
  date: String,
  sklad: String,
  com: String,
});

export default model("Pos", PosSchema);
