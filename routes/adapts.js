import { Router } from "express";

import { createAdapt, getAllAdapts, getAdaptById, updateAdaptById, deleteAdaptById } from "../controllers/adapts.js";


const router = new Router();




// Create One Int
//http://localhost:3002/api/adapts
router.post("/", createAdapt)


// Get All Ints
//http://localhost:3002/api/adapts
router.get("/", getAllAdapts)


// Get Int By Id
//http://localhost:3002/api/adapts/:id
router.get('/:id', getAdaptById)


// Update One Int
//http://localhost:3002/api/adapts/:id
router.put('/:id', updateAdaptById)


// Delete One Int
//http://localhost:3002/api/adapts/:id
router.delete('/:id', deleteAdaptById)


export default router;