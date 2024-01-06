import mongoose from "mongoose";




const RoleSchema = new mongoose.Schema(
	{
		value: { type: String, unique: true, default: "USER" },
		name: String
	},

);

export default mongoose.model("Role", RoleSchema);