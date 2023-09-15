import { Router } from "express";

import { checkAuth } from "../utils/checkAuth.js";
import { getAllArts, getById, removeArt, createArt, deleteArticuls, updateOrCreateArt, downloadExcelArtikuls, } from "../controllers/arts.js";

const router = new Router();




// Create One Articul
//http://localhost:3002/api/arts
router.post("/", createArt)

// Create or Update One Articul
//http://localhost:3002/api/arts/update
router.post("/update", updateOrCreateArt);



// Get Articul By Id
// http://localhost:3002/api/arts/:id
router.get('/:id', getById)


// Get All Articuls
//http://localhost:3002/api/arts
router.get("/", getAllArts)

// Remove One Articul from DB
// http://localhost:3002/api/arts/:id
router.delete('/:id', /* checkAuth, */ removeArt)

// Delete Articuls from DB
// http://localhost:3002/api/arts/
router.delete('/', deleteArticuls)

// Download Excel With Artikuls
// http://localhost:3002/api/arts/download
router.get('/', downloadExcelArtikuls)






















export default router;