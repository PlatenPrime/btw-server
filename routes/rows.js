import { Router } from "express";

import { checkAuth } from "../utils/checkAuth.js";

import { createRow, getAllRows, getById, getRowPallets, deleteRowById, updateRowById } from "../controllers/rows.js";

const router = new Router();


// Create Row
//http://localhost:3002/api/rows
router.post("/", createRow)


// Get All Rows
//http://localhost:3002/api/rows
router.get("/", getAllRows)


// Get Row By Id
// http://localhost:3002/api/rows/:id
router.get('/:id', getById)


// Delete Row By Id
// http://localhost:3002/api/rows/:id
router.delete('/:id', deleteRowById)


// Update Row By Id
// http://localhost:3002/api/rows/:id
router.put('/:id',  updateRowById)



// Get Row Pallets
// http://localhost:3002/api/rows/pallets/:id
router.get('/pallets/:id', getRowPallets)



export default router;