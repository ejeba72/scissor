// This route is for dev purpose only

import { Router } from "express";
import { devController } from "../controllers/dev.controller";

const router: Router = Router();

router.get('/', devController);

export { router as devRoute};