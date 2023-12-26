import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Role from '../models/Role.js'
import { validationResult } from 'express-validator'






const generateAccessToken = (id, role) => {
	const payload = {
		id: id,
		role: role
	}
	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" })
}





// Register user
export const registration = async (req, res) => {
	try {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.status(400).json({ message: "Помилка при реєстрації", errors })
		}

		const { username, password, role, fullname } = req.body
		const candidate = await User.findOne({ username })

		if (candidate) {
			return res.status(400).json({ message: "Пользователь с таким username уже существует" })
		}

		const hashPasword = bcrypt.hashSync(password, 7)
		const userRole = await Role.findOne({ value: role })
		console.log(userRole);



		const user = new User({ username, password: hashPasword, role: userRole.value, fullname })
		await user.save()

		return res.json(user)

	} catch (error) {
		res.status(400).json({ message: "Registration error", error: error })
	}
}



// Login user
export const login = async (req, res) => {
	try {

		const { username, password } = req.body

		const user = await User.findOne({ username })

		if (!user) {
			return res.status(400).json({ message: `Користувач ${username} на знайдений` })
		}

		const validPassword = bcrypt.compareSync(password, user.password)

		if (!validPassword) {
			return res.status(400).json({ message: `Пароль не вірний` })
		}



		const token = generateAccessToken(user._id, user.role)

		return res.json({ user, token })


	} catch (error) {
		res.status(400).json({ message: "Login error" })
	}
}

// Get Me
export const getMe = async (req, res) => {
	try {

		const user = await User.findById(req.params.id)

		if (!user) {
			return res.status(400).json({ message: `Користувач ${id} на знайдений` })
		}


		const token = generateAccessToken(user._id, user.role)


		res.json({
			user,
			token,
		})
	} catch (error) {
		res.json({ message: 'Немає доступу.' })
	}
}


// Get User By Id

export const getUserById = async (req, res) => {
	try {

		const user = await User.findById(req.params.id)

		if (!user) {
			return res.status(400).json({ message: `Користувач ${id} на знайдений` })
		}

		res.json({ user })


	} catch (error) {
		res.json({ message: 'Помилка при пошуку користувача' })
	}
}


// Get All Users

export const getAllUsers = async (req, res) => {

	try {
		const users = await User.find()
		res.json(users)


	} catch (error) {
		console.log(error);

	}

}


// Get All Roles

export const getAllRoles = async (req, res) => {

	try {
		const roles = await Role.find()
		res.json(roles)


	} catch (error) {
		console.log(error);

	}

}




// Update user information
export const updateUserInfo = async (req, res) => {
	try {
		const { userId } = req.params;
		const { password, username, role, fullname } = req.body;

		// Find the user by ID
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ message: 'Пользователь не найден' });
		}

		// Update password if provided
		if (password) {
			const hashPassword = bcrypt.hashSync(password, 7);
			user.password = hashPassword;
		}

		// Update username if provided
		if (username) {
			user.username = username;
		}

		// Update role if provided
		if (role) {
			const userRole = await Role.findOne({ value: role });
			if (!userRole) {
				return res.status(404).json({ message: 'Роль не найдена' });
			}
			user.role = userRole.value;
		}

		// Update fullname if provided
		if (fullname) {
			user.fullname = fullname;
		}

		// Save the updated user
		await user.save();

		// Generate a new token with updated information
		const token = generateAccessToken(user._id, user.role);

		// Return the updated user and token
		res.json({
			user,
			token,
		});
	} catch (error) {
		res.status(400).json({ message: 'Ошибка при обновлении информации пользователя', error: error });
	}
};