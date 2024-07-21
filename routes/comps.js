import { Router } from "express";
import {
	createComp,
	updateOrCreateComp,
	getCompById,
	getAllComps,
	deleteAllComps,
	getCompByArtikul,
	getLinkPage,
	deleteCompById,
	getUpdatedArtDataComp,
	getUpdatedAllArtDataComps,
	updateCompById,
	createOrUpdateCompDataByArtikul,
	getCompDataByArtikul,
	getAllCompDatas,
} from '../controllers/comps.js';


import { checkAuth } from "../utils/checkAuth.js";
import { checkRoles } from "../utils/checkRoles.js";


const router = new Router();


// Create One Comp
//http://localhost:3002/api/comps
router.post("/",

	// checkAuth,

	// checkRoles([
	// 	"PRIME",
	// 	"ADMIN",
	// ]),

	createComp)



router.post(
	"/compData",



	createOrUpdateCompDataByArtikul
)



// Create or Update One Comp
//http://localhost:3002/api/comps/update
router.post("/update",

	// checkAuth,

	// checkRoles([
	// 	"PRIME",
	// 	"ADMIN",
	// ]),


	updateOrCreateComp);


// Update Comp By Id
//http://localhost:3002/api/comps/:id
router.put('/:id', updateCompById)



// Get All Comps
//http://localhost:3002/api/comps
router.get("/", checkAuth, getAllComps)

// Get Link Page
//http://localhost:3002/api/comps/linkpage/:link
router.get("/linkpage/:link", getLinkPage)

// Get Comp By Artikul 
// http://localhost:3002/api/comps/search/:artikul
router.get("/search/:artikul", checkAuth, getCompByArtikul)



// Get All Updated Comps
// http://localhost:3002/api/comps/updated
router.get("/updated", getUpdatedAllArtDataComps)


// Get Updated Comp
// http://localhost:3002/api/comps/updated/:artikul
router.get("/updated/:artikul", getUpdatedArtDataComp)


router.get("/compData", getAllCompDatas)
router.get("/compData/:artikul", getCompDataByArtikul)




// Get Comp By Id
// http://localhost:3002/api/comps/:id
router.get('/:id', getCompById)






// Delete One Comp from DB
// http://localhost:3002/api/comps/:id
router.delete('/:id',

	// checkAuth,

	// checkRoles([
	// 	"PRIME",
	// 	"ADMIN",
	// ]), 

	deleteCompById)


// Delete All Comps from DB
// http://localhost:3002/api/comps/
router.delete('/',

	checkAuth,

	// checkRoles([
	// 	"PRIME",
	// ]),

	deleteAllComps)

export default router;