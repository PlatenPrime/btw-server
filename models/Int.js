import mongoose from "mongoose";

const IntSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        blocks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'IntBlock' }],

    }

)
export default mongoose.model("Int", IntSchema);