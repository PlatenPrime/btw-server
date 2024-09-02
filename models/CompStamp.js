import mongoose from "mongoose";



const dateSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        unique: true,
    },
    avail: {
        btrade: Number,
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
        btrade: String,
        sharte: String,
        yumi: String,
        air: String,
        best: String,
        aero: String,
        balun: String,
        svyato: String,
        idea: String,
    },

})


const CompStampSchema = new mongoose.Schema(
	{
		artikul: {
			type: String,
			required: true,
			unique: true,
		},
        dates: [dateSchema]

	}
)

export default mongoose.model("CompStamp", CompStampSchema);