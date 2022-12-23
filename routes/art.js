import { Router } from "express";

import { checkAuth } from "../utils/checkAuth.js";
import { getAllArts, getById, removeArt, createArt, createArtsZones, deleteArtsZones, } from "../controllers/art.js";

const router = new Router();




// Create Art
//http://localhost:3002/api/arts
router.post("/", checkAuth,  createArt)



// Get All Arts
//http://localhost:3002/api/arts
router.get("/", getAllArts)







//___________________________

// Create Arts Zones
// http://localhost:3002/api/arts/zones
router.post('/zones', createArtsZones)


// Delete Arts Zones

// http://localhost:3002/api/arts/zones
router.delete('/zones', deleteArtsZones)

//_______________________________


















// Get Art By Id
// http://localhost:3002/api/arts/:id
router.get('/:id', getById)


// Remove Art
// http://localhost:3002/api/arts/:id
router.delete('/:id', /* checkAuth, */ removeArt)













export default router;