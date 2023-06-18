import { Router } from "express";
import { deleteUserLogic, loginLogic, logoutLogic, signupLogic, } from "../controllers/user.controller";

const router = Router();

router.post('/', loginLogic);
router.post('/signup', signupLogic);
router.get('/logout', logoutLogic);
router.delete('/delete', deleteUserLogic);
// router.post('/login', loginLogic);

export { router as userRoute };