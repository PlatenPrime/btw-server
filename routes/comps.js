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
	createOrUpdateCompStampByArtikul,
	getAllCompStamps,
	getCompStampByArtikul,
	createCompVariant,
	getAllCompVariants,
	getCompVariantById,
	updateCompVariantById,
	deleteCompVariantById,
	getUpdatedArtDataCompVariant,
	updateCompStampById,
	getUpdatedFilteredArtDataComps,
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



router.post("/compStamp", createOrUpdateCompStampByArtikul)

router.post("/variant", createCompVariant)


// Create or Update One Comp
//http://localhost:3002/api/comps/update
router.post("/update",

	// checkAuth,

	// checkRoles([
	// 	"PRIME",
	// 	"ADMIN",
	// ]),


	updateOrCreateComp);




// Update All Updated Comps
// http://localhost:3002/api/comps/updated
router.put("/updated", getUpdatedAllArtDataComps)

// Update Filtered Updated Comps
// http://localhost:3002/api/comps/updated-filtered
router.put("/updated-filtered", getUpdatedFilteredArtDataComps)



router.put("/variant/:id", updateCompVariantById)


router.put("/compStamp/:id", updateCompStampById)

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







// Get Updated Comp
// http://localhost:3002/api/comps/updated/:artikul
router.get("/updated/:artikul", getUpdatedArtDataComp)




router.get("/compStamp", getAllCompStamps)
router.get("/compStamp/:artikul", getCompStampByArtikul)


router.get("/variant", getAllCompVariants)
router.get("/variant/:id", getCompVariantById)

router.get("/updatedvariant/:artikul", getUpdatedArtDataCompVariant)

// Get Comp By Id
// http://localhost:3002/api/comps/:id
router.get('/:id', getCompById)



router.delete("/variant/:id", deleteCompVariantById)


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