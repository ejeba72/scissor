import { Router } from "express";
import { deleteQrcodeImage, getDashboard, postNewShortUrl, } from "../controllers/url.controller";
import { verifyJwtToken } from "../middleware/auth.middleware";

const router = Router();
// router.use('/', verifyJwtToken);
router.route('/').post(postNewShortUrl).get(getDashboard);
router.route('/delete').post(deleteQrcodeImage);

export { router as urlRoute };