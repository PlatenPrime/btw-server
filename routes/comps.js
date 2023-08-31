import { Router } from "express";
import {
	createComp,
	updateOrCreateComp,
	getCompById,
	getAllComps,
	deleteComp,
	deleteAllComps,
	getCompByArtikul,
} from '../controllers/comps.js';

const router = new Router();


// Create One Comp
//http://localhost:3002/api/comps
router.post("/", createComp)

// Create or Update One Comp
//http://localhost:3002/api/comps/update
router.post("/update", updateOrCreateComp);


// Get Comp By Id
// http://localhost:3002/api/comps/:id
router.get('/:id', getCompById)

// Get Comp By Artikul 
// http://localhost:3002/api/comps/search/:artikul
router.get("/search/:artikul", getCompByArtikul)


// Get All Comps
//http://localhost:3002/api/comps
router.get("/", getAllComps)

// Delete One Comp from DB
// http://localhost:3002/api/comps/:id
router.delete('/:id', /* checkAuth, */ deleteComp)


// Delete All Comps from DB
// http://localhost:3002/api/comps/
router.delete('/', deleteAllComps)

export default router;