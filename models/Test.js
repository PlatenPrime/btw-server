import mongoose from "mongoose";



const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctOption: { type: Number, required: true }
});

const testSchema = new mongoose.Schema({
    adaptId: { type: mongoose.Schema.Types.ObjectId, ref: 'Adapt' },
    questions: [questionSchema]
});

export default mongoose.model('Test', testSchema);