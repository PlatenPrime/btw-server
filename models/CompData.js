import mongoose from "mongoose";



const dateSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
        unique: true,
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

})


const CompDataSchema = new mongoose.Schema(
	{
		artikul: {
			type: String,
			required: true,
			unique: true,
		},
        data: [dateSchema]

	}
)

export default mongoose.model("CompData", CompDataSchema);