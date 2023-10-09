import { Router } from 'express';
import { getPosById, getAllPoses, createPos, updatePos, deletePosById } from '../controllers/poses.js';

const router = new Router();

// Маршрут для создания позиции и добавления её в объект Pallet
// http://localhost:3002/api/poses
router.post('/', createPos);

// Маршрут для получения позиции по ID
// http://localhost:3002/api/poses/:id
router.get('/:id', getPosById);

// Маршрут для получения всех позиций
// http://localhost:3002/api/poses/
router.get('/', getAllPoses);

// Маршрут для редактирования позиции по ID
// http://localhost:3002/api/poses/:id
router.put('/:id', updatePos);

// Маршрут для удаления позиции по ID
router.delete('/:id', deletePosById);

export default router;
