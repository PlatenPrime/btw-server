import { Router } from "express";
import { createPallet, deletePallet, getAllPallets, getPalletById, updatePalletById, getPalletBoxes } from '../controllers/pallets.js';
import { checkAuth } from "../utils/checkAuth.js";


const router = new Router();


// Маршрут для получения объекта Pallet по ID
// http://localhost:3002/api/pallets/:id
router.get('/:id', getPalletById);


// http://localhost:3002/api/pallets
router.get('/', getAllPallets);



// http://localhost:3002/api/pallets/boxes/:id
router.get('/boxes/:id', getPalletBoxes);



// Маршрут для создания объекта Pallet с вложенными коробками и добавления его в объект Row
// http://localhost:3002/api/pallets
router.post('/', createPallet);

// Маршрут для редактирования объекта Pallet по ID
router.put('/:id', updatePalletById);

// Маршрут для удаления объекта Pallet по ID
router.delete('/:id', deletePallet);







export default router;