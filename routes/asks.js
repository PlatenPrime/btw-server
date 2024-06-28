import { Router } from "express";
import { createAsk, getAllAsks, getAskById, updateAskById, deleteAskById } from '../controllers/ask.js';
import { checkAuth } from "../utils/checkAuth.js";
import { checkRoles } from "../utils/checkRoles.js";

const router = new Router();

// Маршрут для создания запроса на снятие (Ask)
//http://localhost:3002/api/asks
router.post('/', checkAuth,

	// checkRoles([
	// 	"PRIME",
	// 	"SKLAD",
	// 	"PICKER",
	// ]),
	createAsk);

// Маршрут для получения всех запросов на снятие (Ask)
//http://localhost:3002/api/asks
router.get('/',

	checkAuth,

	getAllAsks);

// Маршрут для получения запроса на снятие (Ask) по ID
//http://localhost:3002/api/asks/:id
router.get('/:id',

	checkAuth,

	getAskById);

// Маршрут для редактирования запроса на снятие (Ask) по ID
//http://localhost:3002/api/asks/:id
router.put('/:id',

	checkAuth,

	// checkRoles([
	// 	"PRIME",
	// 	"SKLAD",
	// ]),

	updateAskById);

// Маршрут для удаления запроса на снятие (Ask) по ID
//http://localhost:3002/api/asks/:id
router.delete('/:id',

	checkAuth,

	// checkRoles([
	// 	"PRIME",
	// 	"SKLAD",
	// 	"PICKER"
	// ]),

	deleteAskById);

export default router;
