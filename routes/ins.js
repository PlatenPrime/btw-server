import { Router } from "express";

import { checkAuth } from "../utils/checkAuth.js";
import { checkRoles } from "../utils/checkRoles.js";
import { getAllInstructions, getById, deleteInstruction, createInstruction, deleteInstructions, updateOrCreateInstruction, } from "../controllers/ins.js";

const router = new Router();

// Create One Instruction
//http://localhost:3002/api/ins
router.post("/",

	// checkAuth,

	// checkRoles([
	// 	"PRIME",
	// 	"SKLAD",
	// ]),

	createInstruction)

// Update One Instruction
//http://localhost:3002/api/ins/:id
router.put("/:id",

	// checkAuth,

	// checkRoles([
	// 	"PRIME",
	// 	"SKLAD",
	// ]),

	updateOrCreateInstruction);

// Get Instruction By Id
// http://localhost:3002/api/ins/:id
router.get('/:id',  getById)

// Get All Instructions
//http://localhost:3002/api/ins
router.get("/",  getAllInstructions)

// Remove One Instruction from DB
// http://localhost:3002/api/ins/:id
router.delete('/:id',

// checkAuth,

	// checkRoles([
	// 	"PRIME"
	// ]),

	deleteInstruction);

// Remove All Instructions from DB
// http://localhost:3002/api/ins
router.delete('/', 

// checkAuth,

// 	checkRoles([
// 		"PRIME"
// 	]),

	deleteInstructions);

export default router;
