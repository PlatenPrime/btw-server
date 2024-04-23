import mongoose from "mongoose";

const IntBlockSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        int: { type: mongoose.Schema.Types.ObjectId, ref: 'Int' },
        ins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Instruction' }],
        time: Number,

    }

)
export default mongoose.model("IntBlock", IntBlockSchema);