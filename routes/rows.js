import { Router } from "express";

import { checkAuth } from "../utils/checkAuth.js";
import { checkRoles } from "../utils/checkRoles.js";

import { createRow, getAllRows, getById, getRowPallets, deleteRowById, updateRowById } from "../controllers/rows.js";

const router = new Router();


// Create Row
//http://localhost:3002/api/rows
router.post("/", checkAuth,

	// checkRoles([
	// 	"PRIME",
	// 	"SKLAD",
	// ]),


	createRow)


// Get All Rows
//http://localhost:3002/api/rows
router.get("/", checkAuth, getAllRows)


// Get Row By Id
// http://localhost:3002/api/rows/:id
router.get('/:id', checkAuth, getById)


// Delete Row By Id
// http://localhost:3002/api/rows/:id
router.delete('/:id',

	checkAuth,

	// checkRoles([
	// 	"PRIME",
	// 	"SKLAD",
	// ]),

	deleteRowById)


// Update Row By Id
// http://localhost:3002/api/rows/:id
router.put('/:id',



	checkAuth,

	// checkRoles([
	// 	"PRIME",
	// 	"SKLAD",
	// ]),



	updateRowById)



// Get Row Pallets
// http://localhost:3002/api/rows/pallets/:id
router.get('/pallets/:id', checkAuth, getRowPallets)



export default router;