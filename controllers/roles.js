import Role from "../models/Role.js";


// Get All Roles

export const getAllRoles = async (req, res) => {
	try {
		const roles = await Role.find();

		if (!roles || roles.length === 0) {
			return res.json({ message: 'Ролей нет' });
		}

		res.json({ roles });
	} catch (error) {
		res.json({ message: error.message });
	}
};