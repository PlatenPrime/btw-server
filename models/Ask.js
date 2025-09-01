import { model, Schema } from "mongoose";

const askUserDataSchema =
  new Schema
  ({
    _id: { type: Schema.Types.ObjectId, required: true },
    fullname: { type: String, required: true },
    telegram: { type: String },
    photo: { type: String },
  },
  { _id: false });

const AskSchema = new Schema(
  {
    artikul: String,
    nameukr: String,
    quant: Number,
    status: String,
    com: String,
    actions: [{ type: String }],
    asker: { type: Schema.Types.ObjectId, ref: "User" },
    solver: { type: Schema.Types.ObjectId, ref: "User" },
    askerData: askUserDataSchema,
    solverData: askUserDataSchema,
  },
  { timestamps: true }
);

export default model("Ask", AskSchema);
