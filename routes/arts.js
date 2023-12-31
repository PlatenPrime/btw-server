import { Router } from "express";

import { checkAuth } from "../utils/checkAuth.js";
import { checkRoles } from "../utils/checkRoles.js";
import { getAllArts, getById, deleteArt, createArt, deleteArticuls, updateOrCreateArt, } from "../controllers/arts.js";

const router = new Router();




// Create One Articul
//http://localhost:3002/api/arts
router.post("/",

	checkAuth,

	checkRoles([
		"PRIME",
		"SKLAD",
	]),



	createArt)

// Create or Update One Articul
//http://localhost:3002/api/arts/update
router.post("/update",

	checkAuth,

	checkRoles([
		"PRIME",
		"SKLAD",
	]),

	updateOrCreateArt);



// Get Articul By Id
// http://localhost:3002/api/arts/:id
router.get('/:id', checkAuth, getById)


// Get All Articuls
//http://localhost:3002/api/arts
router.get("/", checkAuth, getAllArts)

// Remove One Articul from DB
// http://localhost:3002/api/arts/:id
router.delete('/:id', checkAuth,

	checkRoles([
		"PRIME",
		"SKLAD",
	]), deleteArt)

// Delete Articuls from DB
// http://localhost:3002/api/arts/
router.delete('/', checkAuth,

	checkRoles([
		"PRIME",
		"SKLAD",
	]), deleteArticuls)























export default router;