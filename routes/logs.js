import { Router } from "express";
import { createLog, getAllLogs } from "../controllers/logs.js";



const router = new Router();


// Create One Log
//http://localhost:3002/api/logs
router.post("/", createLog)


// Get All Logs
//http://localhost:3002/api/logs
router.get("/", getAllLogs)




export default router;