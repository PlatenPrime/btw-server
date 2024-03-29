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

		},
		password: {
			type: String,
			required: true,
		},
		role: { type: String, ref: "Role" },
		telegram: String,
		photo: String



	},
	{ timestamps: true },
);

export default mongoose.model("User", UserSchema);