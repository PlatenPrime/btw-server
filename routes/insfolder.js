import { Router } from "express";
import { createInsFolder } from "../controllers/insfolder.js";
import { checkAuth } from "../utils/checkAuth.js";




const router = new Router();



router.post("/", checkAuth, createInsFolder)




export default router