import { Router } from 'express';
import { getBoxById, createBox, updateBox, deleteBoxById } from '../controllers/boxes.js';

const router = new Router();


// Маршрут для создания коробки и добавления её в объект Pallet
// http://localhost:3002/api/boxes
router.post('/', createBox);

// Маршрут для получения коробки по ID
// http://localhost:3002/api/boxes/:id
router.get('/:id', getBoxById);



// Маршрут для редактирования коробки по ID
// http://localhost:3002/api/boxes/:id
router.put('/:id', updateBox);



// Маршрут для удаления коробки по ID
router.delete('/:id', deleteBoxById);

export default router;
