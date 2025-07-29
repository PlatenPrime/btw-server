import { Router } from "express";
import { createPallet, deletePallet, getAllPallets, getPalletById, updatePalletById, getPalletPoses, clearPalletById, movePalletContent } from '../controllers/pallets.js';
import { checkAuth } from "../utils/checkAuth.js";
import { checkRoles } from "../utils/checkRoles.js";


const router = new Router();


// Маршрут для получения объекта Pallet по ID
// http://localhost:3002/api/pallets/:id
router.get('/:id', checkAuth, getPalletById);


// http://localhost:3002/api/pallets
router.get('/', checkAuth, getAllPallets);



// http://localhost:3002/api/pallets/poses/:id
router.get('/poses/:id', checkAuth, getPalletPoses);



// Маршрут для создания объекта Pallet с вложенными коробками и добавления его в объект Row
// http://localhost:3002/api/pallets
router.post('/',

	checkAuth,

	// checkRoles([
	// 	"PRIME",
	// 	"SKLAD",
	// ]),

	createPallet);

// Маршрут для очистки объекта Pallet по ID
// http://localhost:3002/api/pallets/clear/:id
router.put('/clear/:id',

	checkAuth,

	// checkRoles([
	// 	"PRIME",
	// 	"SKLAD",
	// ]),

	clearPalletById);


// Маршрут для перемещения содержимого на очищенную паллету
// http://localhost:3002/api/pallets/move
router.put('/move',

checkAuth,

// checkRoles([
// 	"PRIME",
// 	"SKLAD",
// ]),


movePalletContent);



// Маршрут для редактирования объекта Pallet по ID
// http://localhost:3002/api/pallets/:id
router.put('/:id', 

checkAuth,

// checkRoles([
// 	"PRIME",
// 	"SKLAD",
// ]),


updatePalletById);





// Маршрут для удаления объекта Pallet по ID
router.delete('/:id',

checkAuth,

checkRoles([
	"PRIME",
	
]),

deletePallet);







export default router;