import mongoose from "mongoose";

const IntBlockSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        intId: { type: mongoose.Schema.Types.ObjectId, ref: 'Int' },
        insId: { type: mongoose.Schema.Types.ObjectId, ref: 'Instruction' },


    }

)
export default mongoose.model("IntBlock", IntBlockSchema);