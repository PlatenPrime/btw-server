import { Router } from "express";

import { checkAuth } from "../utils/checkAuth.js";
import { checkRoles } from "../utils/checkRoles.js";

import { createIntBlock, getAllIntBlocks, getIntBlockById, deleteIntBlockById, updateIntBlockById, getIntBlocksByIntId } from "../controllers/intblocks.js";




const router = new Router();


// http://localhost:3002/api/intblocks
router.post("/", createIntBlock)


// http://localhost:3002/api/intblocks
router.get("/", getAllIntBlocks)


// http://localhost:3002/api/intblocks/int/:id
router.get("/int/:id", getIntBlocksByIntId)

// http://localhost:3002/api/intblocks/:id
router.get("/:id", getIntBlockById)


// http://localhost:3002/api/intblocks/:id
router.put("/:id", updateIntBlockById)

// http://localhost:3002/api/intblocks/:id
router.delete("/:id", deleteIntBlockById)

export default router
