import { Router } from "express";
import { deleteUserLogic, loginLogic, loginPage, logoutLogic, signupLogic, signupPage } from "../controllers/user.controller";

const router = Router();

router.route('/').get(loginPage).post(loginLogic);
router.route('/signup').get(signupPage).post(signupLogic);
router.get('/logout', logoutLogic);
router.delete('/delete', deleteUserLogic);
// router.post('/login', loginLogic);

export { router as userRoute };