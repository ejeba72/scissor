import { Router } from "express";
import { getDashboard, postNewShortUrl, } from "../controllers/url.controller";
import { verifyJwtToken } from "../middleware/auth.middleware";

const router = Router();

// router.post('/', postNewShortUrl);
verifyJwtToken
router.route('/').post(postNewShortUrl).get(getDashboard);

export { router as urlRoute };