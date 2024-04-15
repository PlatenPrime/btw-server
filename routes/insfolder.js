import { Router } from "express";
import { createInsFolder, deleteInsFolderById, getAllInsFolders, getInsFolderById, updateInsFolderById } from "../controllers/insfolder.js";
import { checkAuth } from "../utils/checkAuth.js";




const router = new Router();

// http://localhost:3002/api/insfolders

router.post("/", checkAuth, createInsFolder)


router.get("/", checkAuth, getAllInsFolders)


router.get("/:id", checkAuth, getInsFolderById)


router.put("/:id", checkAuth, updateInsFolderById)


router.delete("/:id", checkAuth, deleteInsFolderById)




export default router