import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { createTest, getAllTests, getTestById, updateTestById, deleteTestById, deleteAllTests } from "../controllers/tests.js";



const router = new Router();

//http://localhost:3002/api/tests


router.post("/", createTest)

router.get("/", getAllTests)

router.get("/:id", getTestById)

router.put("/:id", updateTestById)

router.delete("/", deleteAllTests)

router.delete("/:id", deleteTestById)






export default router