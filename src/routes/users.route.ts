import { Router } from "express";
import { deleteUserLogic, loginLogic, logoutLogic, signupLogic } from "../controllers/users.controller";

const router = Router();

router.post('/signup', signupLogic);
router.route('/').post(loginLogic).get(logoutLogic);
router.delete('/delete', deleteUserLogic);
// router.post('/login', loginLogic);
// router.get('/logout', logoutLogic);

export { router as userRoute };