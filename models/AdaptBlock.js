import mongoose from "mongoose";

const AdaptBlockSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        adaptId: { type: mongoose.Schema.Types.ObjectId, ref: 'Adapt' },
        insId: { type: mongoose.Schema.Types.ObjectId, ref: 'Instruction' },


    }

)
export default mongoose.model("AdaptBlock", AdaptBlockSchema);