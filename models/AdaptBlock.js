import mongoose from "mongoose";

const AdaptBlockSchema = new mongoose.Schema(
    {
        adaptId: { type: mongoose.Schema.Types.ObjectId, ref: 'Adapt' },
        insId: { type: mongoose.Schema.Types.ObjectId, ref: 'Instruction' },
        isDone: {
            type: Map,
            of: Boolean,
            default: {}
        }


    }

)
export default mongoose.model("AdaptBlock", AdaptBlockSchema);