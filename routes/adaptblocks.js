import { Router } from "express";

import { checkAuth } from "../utils/checkAuth.js";
import { checkRoles } from "../utils/checkRoles.js";

import { createAdaptBlock, getAllAdaptBlocks, getAdaptBlockById, deleteAdaptBlockById, updateAdaptBlockById, getAdaptBlocksByAdaptId, updateAdaptBlockIsDone, getAdaptBlockIsDone } from "../controllers/adaptblocks.js";




const router = new Router();


// http://localhost:3002/api/adaptblocks
router.post("/", createAdaptBlock)


// http://localhost:3002/api/adaptblocks
router.get("/", getAllAdaptBlocks)


// http://localhost:3002/api/adaptblocks/adapt/:id
router.get("/adapt/:id", getAdaptBlocksByAdaptId)

// http://localhost:3002/api/adaptblocks/:id
router.get("/:id", getAdaptBlockById)



// http://localhost:3002/api/adaptblocks/:id
router.put("/:id", updateAdaptBlockById)

// http://localhost:3002/api/adaptblocks/:id
router.delete("/:id", deleteAdaptBlockById)



// http://localhost:3002/api/adaptblocks/:id/isDone
router.put("/:id/isDone", updateAdaptBlockIsDone)

// http://localhost:3002/api/adaptblocks/:id/isDone/:userId
router.get("/:id/isDone/:userId", getAdaptBlockIsDone)





export default router
