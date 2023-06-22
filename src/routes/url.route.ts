import { Router } from "express";
import { getLinkHistory, postNewShortUrl } from "../controllers/url.controller";


const router = Router();

// router.post('/', postNewShortUrl);
router.route('/').post(postNewShortUrl).get(getLinkHistory);

export { router as urlRoute };