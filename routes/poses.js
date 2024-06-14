import { Router } from 'express';
import { getPosById, getAllPoses, createPos, updatePos, deletePosById, getPosesByArtikul, addTitles } from '../controllers/poses.js';
import { checkAuth } from "../utils/checkAuth.js";
import { checkRoles } from "../utils/checkRoles.js";

const router = new Router();

// Маршрут для создания позиции и добавления её в объект Pallet
// http://localhost:3002/api/poses
router.post('/',

	checkAuth,

	checkRoles([
		"PRIME",
		"SKLAD",
	]),


	createPos);

// Маршрут для получения позиций с артикулом
// http://localhost:3002/api/poses/artikul/:artikul
router.get('/artikul/:artikul',

	checkAuth,

	getPosesByArtikul);



// Маршрут для получения позиции по ID
// http://localhost:3002/api/poses/:id
router.get('/:id',

	checkAuth,

	getPosById);

// Маршрут для получения всех позиций
// http://localhost:3002/api/poses/
router.get('/',

	checkAuth,

	getAllPoses);


// http://localhost:3002/api/poses/addtitles
router.put("/addtitles", addTitles)

// Маршрут для редактирования позиции по ID
// http://localhost:3002/api/poses/:id
router.put('/:id',

	checkAuth,

	// checkRoles([
	// 	"PRIME",
	// 	"SKLAD",
	// ]),


	updatePos);

// Маршрут для удаления позиции по ID
router.delete('/:id',

	checkAuth,

	// checkRoles([
	// 	"PRIME",
	// 	"SKLAD",
	// ]),

	deletePosById);







export default router;
