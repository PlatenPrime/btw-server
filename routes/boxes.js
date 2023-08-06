import { Router } from 'express';
import { getBoxOnID, createBox, editBox, deleteBox } from '../controllers/boxes.js';

const router = new Router();

// Маршрут для получения коробки по ID
router.get('/:id', getBoxOnID);

// Маршрут для создания коробки и добавления её в объект Pallet и Row
router.post('/', createBox);

// Маршрут для редактирования коробки по ID
router.put('/:id', editBox);

// Маршрут для удаления коробки по ID
router.delete('/:id', deleteBox);

export default router;
