import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { checkRoles } from "../utils/checkRoles.js";
import { getAllDefs, getLatestDef, getRemainsDefs } from "../controllers/defs.js";


const router = new Router();



// Маршрут для получения всех дефицитов
//http://localhost:3002/api/defs
router.get(
    '/',
    // checkAuth,
    getAllDefs
);



// Маршрут получения последнего дефицита
//http://localhost:3002/api/defs/latest
router.get(
    '/latest',
    // checkAuth,
    getLatestDef
);



//http://localhost:3002/api/defs/remains

router.get(
    '/remains',
    getRemainsDefs
)








export default router;