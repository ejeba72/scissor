import { Router } from "express";
import { errorPage, homepage, loginPage, signupPage, success } from "../controllers/scissor.controller";
import { verifyJwtToken } from "../middleware/auth.middleware";

const router = Router();
router.get('/homepage', homepage);
router.get('/success', success);
router.get('/404-page', errorPage)
router.get('/signup', signupPage);
router.get('/login', loginPage);

export { router as scissorRoute };