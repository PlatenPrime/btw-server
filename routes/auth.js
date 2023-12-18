import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { checkRoles } from "../utils/checkRoles.js";
import { registration, login, getMe, getUserById, getAllUsers, getAllRoles } from "./../controllers/auth.js";
import { check } from "express-validator";


const router = new Router();


// Register
//http://localhost:3002/api/auth/register
router.post("/registration",
	[
		check("username", "username не може бути пустим").notEmpty(),
		check("password", "Пароль має бути 4-16 символів ").isLength({
			min: 4,
			max: 16
		}),
		check("fullname", "Повне ім'я не може бути пустим").notEmpty(),
	],
	registration)


//Login
//http://localhost:3002/api/auth/login
router.post("/login", login)


//Get Me
//http://localhost:3002/api/auth/me/:id
router.get("/me/:id", checkAuth, getMe)


//Get All Users
//http://localhost:3002/api/auth/users
router.get("/users",
	checkAuth,
	// checkRoles([
	// 	"PRIME",
	// 	"ADMIN",

	// ]),
	getAllUsers)



//Get User By Id
//http://localhost:3002/api/auth/users/:id
router.get("/users/:id", checkAuth, getUserById)


//Get All Roles
//http://localhost:3002/api/auth/roles
router.get("/roles",
	checkAuth,
	getAllRoles)




export default router;