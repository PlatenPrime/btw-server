import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Role from '../models/Role.js'
import { validationResult } from 'express-validator'

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



		const user = new User({ username, password: hashPasword, roles: [userRole.value], fullname })
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

		if



	} catch (error) {
		res.status(400).json({ message: "Login error" })
	}
}

// Get Me
export const getMe = async (req, res) => {
	try {



	} catch (error) {

	}
}


// Get User By Id

export const getUserById = async (req, res) => {
	try {



	} catch (error) {

	}
}


// Get User

export const getAllUsers = async (req, res) => {

	try {



	} catch (error) {

	}

}
