import { Router } from "express";
import { getAllRoles } from "../controllers/roles.js";



const router = new Router();


// Get All Roles
//http://localhost:3002/api/roles
router.get("/", getAllRoles)

export default router;  