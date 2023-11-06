import { Router } from "express";
import { createAsk, getAllAsks, getAskById, updateAskById, deleteAsk } from '../controllers/ask.js';
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

// Маршрут для создания запроса на снятие (Ask)
//http://localhost:3002/api/asks
router.post('/', createAsk);

// Маршрут для получения всех запросов на снятие (Ask)
//http://localhost:3002/api/asks
router.get('/', getAllAsks);

// Маршрут для получения запроса на снятие (Ask) по ID
//http://localhost:3002/api/asks
router.get('/:id', getAskById);

// Маршрут для редактирования запроса на снятие (Ask) по ID
//http://localhost:3002/api/asks
router.put('/:id', updateAskById);

// Маршрут для удаления запроса на снятие (Ask) по ID
//http://localhost:3002/api/asks
router.delete('/:id', deleteAsk);

export default router;
