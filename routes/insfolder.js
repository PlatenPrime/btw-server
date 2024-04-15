import { Router } from "express";
import { createInsFolder } from "../controllers/insfolder";
import { checkAuth } from "../utils/checkAuth";




const router = new Router();



router.post("/", checkAuth, createInsFolder)




export default router