import mongoose from "mongoose";

const DefSchema = new mongoose.Schema(
    {
        items: [{
            artikul: String,
            nameukr: String,
            stockQuant: Number,
            btradeQuant: Number,
        }],
    },
    { timestamps: true },
)

export default mongoose.model("Def", DefSchema);