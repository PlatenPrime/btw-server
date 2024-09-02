import mongoose from "mongoose";

const CompVariantSchema = new mongoose.Schema(
    {
        artikul: {
            type: String,
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
        connect: String,
        size: String,
        competitorsLinks: {
            sharteLink: String,
            yumiLink: String,
            airLink: String,
            bestLink: String,
            aeroLink: String,
			balunLink: String,
			svyatoLink: String,
			ideaLink: String,
        },
        avail: {
            sharte: mongoose.Schema.Types.Mixed,
            yumi: mongoose.Schema.Types.Mixed,
            air: mongoose.Schema.Types.Mixed,
            best: mongoose.Schema.Types.Mixed,
            aero: mongoose.Schema.Types.Mixed,
            balun: mongoose.Schema.Types.Mixed,
            svyato: mongoose.Schema.Types.Mixed,
            idea: mongoose.Schema.Types.Mixed,
        },
        price: {
            sharte: String,
            yumi: String,
            air: String,
            best: String,
            aero: String,
            balun: String,
            svyato: String,
            idea: String,
        },



    }
)

export default mongoose.model("CompVariant", CompVariantSchema);