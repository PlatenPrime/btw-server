import mongoose from "mongoose";

const DefsSchema = new mongoose.Schema(
    {
        defs: [{
            artikul: String,
            nameukr: String,
            stock: Number,
            quant: Number,
        }],
    },
    { timestamps: true },
)

export default mongoose.model("Defs", DefsSchema);