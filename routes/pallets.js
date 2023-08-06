import { Router } from "express";
import { createPalletWithBoxes, editPallet, deletePallet, getPalletOnID } from '../controllers/pallets.js';
import { checkAuth } from "../utils/checkAuth.js";


const router = new Router();


// Маршрут для получения объекта Pallet по ID
router.get('/:id', getPalletOnID);

// Маршрут для создания объекта Pallet с вложенными коробками и добавления его в объект Row
router.post('/', createPalletWithBoxes);

// Маршрут для редактирования объекта Pallet по ID
router.put('/:id', editPallet);

// Маршрут для удаления объекта Pallet по ID
router.delete('/:id', deletePallet);







export default router;