import { Router } from "express";
import { deleteUserLogic, loginLogic, loginPage, logoutLogic, signupLogic, signupPage } from "../controllers/user.controller";

const router = Router();

router.route('/signup').post(signupLogic).get(signupPage);
router.route('/').post(loginLogic).get(loginPage);
router.delete('/delete', deleteUserLogic);
router.get('/logout', logoutLogic);
// router.post('/login', loginLogic);

export { router as userRoute };