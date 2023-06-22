import { Router } from "express";
import { getDashboard, getLinkHistory, postNewShortUrl, postUrlAnalytics } from "../controllers/url.controller";
import { verifyJwtToken } from "../middleware/auth.middleware";

const router = Router();

// router.post('/', postNewShortUrl);
verifyJwtToken
router.route('/').post(postNewShortUrl).get(getLinkHistory);
router.route('/dashboard').post(postUrlAnalytics).get(getDashboard);

export { router as urlRoute };