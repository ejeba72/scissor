import { Router } from "express";
import { dashboard, errorPage, homepage, loginPage, signupPage, success } from "../controllers/scissor.controller";

const router = Router();
router.get('/dashboard', dashboard);
router.get('/success', success);
router.get('/404-page', errorPage)
router.get('/signup', signupPage);
router.get('/', loginPage);
// NOTE: Home page (index route) is located in redirect route.

export { router as scissorRoute };