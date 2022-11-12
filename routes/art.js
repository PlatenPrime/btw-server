import { Router } from "express";

import { checkAuth } from "../utils/checkAuth.js";
import { getAllArts, getByTitle, getById, removeArt, createArt, updateArtsZones, } from "../controllers/art.js";

const router = new Router();




// Create Row
//http://localhost:3002/api/arts
router.post("/", checkAuth, createArt)



// Get All Arts
//http://localhost:3002/api/arts
router.get("/", getAllArts)





// Get Art By Title
// http://localhost:3002/api/arts/title
router.get('/title', getByTitle)

//___________________________

// Update Art Zone
// http://localhost:3002/api/arts/zones
router.put('/:id', checkAuth, updateArtsZones)

//_______________________________


// Get Art By Id
// http://localhost:3002/api/arts/:id
router.get('/:id', getById)


// Remove Art
// http://localhost:3002/api/arts/:id
router.delete('/:id', checkAuth, removeArt)













export default router;