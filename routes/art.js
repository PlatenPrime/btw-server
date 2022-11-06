import { Router } from "express";

import { checkAuth } from "../utils/checkAuth.js";
import { getAllArts, getByTitle } from "../controllers/art.js";

const router = new Router();


// Get All Arts
//http://localhost:3002/api/arts
router.get("/", getAllArts)


// Get Art By Title
// http://localhost:3002/api/arts/art
router.get('/art', getByTitle)






export default router;