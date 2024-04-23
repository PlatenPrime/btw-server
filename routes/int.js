import { Router } from "express";

import { createInt, getAllInts, getIntById, updateIntById, deleteIntById } from "../controllers/int.js";


const router = new Router();




// Create One Int
//http://localhost:3002/api/ints
router.post("/", createInt)


// Get All Ints
//http://localhost:3002/api/ints
router.get("/", getAllInts)


// Get Int By Id
//http://localhost:3002/api/ints/:id
router.get('/:id', getIntById)


// Update One Int
//http://localhost:3002/api/ints/:id
router.put('/:id', updateIntById)


// Delete One Int
//http://localhost:3002/api/ints/:id
router.delete('/:id', deleteIntById)


export default router;