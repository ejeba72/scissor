// This route is for dev purpose only

import { Router } from "express";
import { getReq, postReq } from "../controllers/dev.controller";

const router: Router = Router();

router.get('/', getReq);
router.post('/', postReq);

export { router as devRoute};