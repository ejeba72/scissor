import { Router } from "express";
import { deleteQrcodeImages, getDashboard, postNewShortUrl, } from "../controllers/url.controller";
import { verifyJwtToken } from "../middleware/auth.middleware";

const router = Router();
// router.use('/', verifyJwtToken);
router.route('/').post(postNewShortUrl).get(getDashboard);
router.route('/delete').get(deleteQrcodeImages);

export { router as urlRoute };