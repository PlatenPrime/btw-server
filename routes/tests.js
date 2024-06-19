import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { createTest, getAllTests, getTestById, updateTestById, deleteTestById, deleteAllTests } from "../controllers/tests.js";



const router = new Router();

//http://localhost:3002/api/tests


router.post("/",  checkAuth, createTest)

router.get("/", checkAuth, getAllTests)

router.get("/:id", checkAuth, getTestById)

router.put("/:id", checkAuth, updateTestById)

router.delete("/", checkAuth, deleteAllTests)

router.delete("/:id", checkAuth, deleteTestById)






export default router