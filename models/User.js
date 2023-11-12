import mongoose from "mongoose";




const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		fullname: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ['user', 'admin', 'picker', 'storekeeper', 'manager'],
			default: 'user',
		},


	},
	{ timestamps: true },
);

export default mongoose.model("User", UserSchema);