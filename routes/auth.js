import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { registration, login, getMe, getUserById, getAllUsers } from "./../controllers/auth.js";
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
	]

	, registration)


//Login
//http://localhost:3002/api/auth/login
router.post("/login", login)



//Get All Users
//http://localhost:3002/api/auth/
router.get("/users", getAllUsers)


//Get Me
//http://localhost:3002/api/auth/me
router.get("/me", getMe)

//Get User By Id
//http://localhost:3002/api/auth/:id
router.get("/:id", getUserById)





export default router;