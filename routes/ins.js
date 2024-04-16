import { Router } from "express";

import { checkAuth } from "../utils/checkAuth.js";
import { checkRoles } from "../utils/checkRoles.js";
import { getAllInstructions, getInstructionById, deleteInstruction, createInstruction, deleteInstructions, updateOrCreateInstruction, getFolderInstructions,  } from "../controllers/ins.js";

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
router.get('/:id',  getInstructionById)

// Get All Instructions
//http://localhost:3002/api/ins
router.get("/",  getAllInstructions)

// Get Folder Instructions
//http://localhost:3002/api/ins/insfolder/:id
router.get('/insfolder/:id',  getFolderInstructions)

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
