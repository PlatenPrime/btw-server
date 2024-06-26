import mongoose from "mongoose";

const AdaptSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        blocks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AdaptBlock' }],
        test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },

    }

)
export default mongoose.model("Adapt", AdaptSchema);