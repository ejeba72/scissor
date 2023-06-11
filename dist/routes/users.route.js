"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const router = (0, express_1.Router)();
exports.userRoute = router;
router.post('/signup', users_controller_1.signupLogic);
router.route('/').post(users_controller_1.loginLogic).get(users_controller_1.logoutLogic);
router.delete('/delete', users_controller_1.deleteUserLogic);