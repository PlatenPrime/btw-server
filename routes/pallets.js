import { Router } from "express";
import { createPallet, getAllPallets, getById, removePallet, updatePallet } from "../controllers/pallets.js";
import { checkAuth } from "../utils/checkAuth.js";


const router = new Router();


// Create Pallet
//http://localhost:3002/api/pallets/:id
router.post('/:id', checkAuth, createPallet)

// Get All Pallets
//http://localhost:3002/api/pallets
router.get("/", getAllPallets)


// Get Pallet By Id
// http://localhost:3002/api/pallets/:id
router.get('/:id', getById)



// Remove Pallet
// http://localhost:3002/api/pallets/:id
router.delete('/:id', checkAuth, removePallet)


// Update Pallet
// http://localhost:3002/api/pallets/:id
router.put('/:id', checkAuth, updatePallet)


export default router;