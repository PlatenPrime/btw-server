import { Router } from "express";
import { createPallet, deletePallet, getAllPallets, getPalletById, updatePalletById, getPalletPoses, clearPalletById, movePalletContent } from '../controllers/pallets.js';
import { checkAuth } from "../utils/checkAuth.js";


const router = new Router();


// Маршрут для получения объекта Pallet по ID
// http://localhost:3002/api/pallets/:id
router.get('/:id', getPalletById);


// http://localhost:3002/api/pallets
router.get('/', getAllPallets);



// http://localhost:3002/api/pallets/poses/:id
router.get('/poses/:id', getPalletPoses);



// Маршрут для создания объекта Pallet с вложенными коробками и добавления его в объект Row
// http://localhost:3002/api/pallets
router.post('/', createPallet);

// Маршрут для очистки объекта Pallet по ID
// http://localhost:3002/api/pallets/clear/:id
router.put('/clear/:id', clearPalletById);


// Маршрут для перемещения содержимого на очищенную паллету
// http://localhost:3002/api/pallets/move
router.put('/move', movePalletContent);



// Маршрут для редактирования объекта Pallet по ID
// http://localhost:3002/api/pallets/:id
router.put('/:id', updatePalletById);





// Маршрут для удаления объекта Pallet по ID
router.delete('/:id', deletePallet);







export default router;