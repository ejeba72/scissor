import { Router } from "express";
import { verifyJwtToken } from "../middleware/auth.middleware";
import { 
    deleteAllUrls, 
    deleteQrcodeImages, 
    deleteUrl, 
    getDashboard, 
    postNewShortUrl, 
    updateUrl, 
} from "../controllers/url.controller";

const router = Router();
// router.use('/', verifyJwtToken);
router.route('/').post(postNewShortUrl).get(getDashboard);
router.route('/delete').get(deleteQrcodeImages).delete(deleteUrl);
router.route('/delete-all').delete(deleteAllUrls);
router.route('/update').put(updateUrl);

export { router as urlRoute };