// This route is for dev purpose only

import { Router } from "express";
import { devController, postReq } from "../controllers/dev.controller";

const router: Router = Router();

router.get('/', devController);
router.post('/', postReq);

export { router as devRoute};