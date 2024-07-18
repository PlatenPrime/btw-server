import mongoose from "mongoose";

const CompVariantSchema = new mongoose.Schema(
    {
        artikul: {
            type: Number,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            required: true,
        },
    
        imageUrl: {
            type: String
        },
        prod: {
            type: String
        },
        size: String,
        competitorsLinks: {
            sharteLink: String,
            yumiLink: String,
            airLink: String,
            bestLink: String,
        },
        avail: {
            btrade: Number,
            sharte: mongoose.Schema.Types.Mixed,
            yumi: mongoose.Schema.Types.Mixed,
            air: mongoose.Schema.Types.Mixed,
            best: mongoose.Schema.Types.Mixed,
        },
        price: {
            btrade: String,
            sharte: String,
            yumi: String,
            air: String,
            best: String,
        },
    


    }
)

export default mongoose.model("CompVariant", CompVariantSchema);