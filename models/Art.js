import mongoose from "mongoose";

const btradeStockSchema = new mongoose.Schema({
  value: Number,
  date: Date,
});

const ArtSchema = new mongoose.Schema({
  artikul: {
    type: String,
    required: true,
    unique: true,
  },
  nameukr: {
    type: String,
  },
  namerus: {
    type: String,
  },
  zone: {
    type: String,
    required: true,
  },
  limit: {
    type: Number,
  },
  marker: String,
  btradeStock: btradeStockSchema,
});

export default mongoose.model("Art", ArtSchema);
