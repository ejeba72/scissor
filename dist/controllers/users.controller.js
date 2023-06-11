"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserLogic = exports.logoutLogic = exports.loginLogic = exports.signupLogic = void 0;
const users_model_1 = require("../models/users.model");
const user_validation_1 = require("../validations/user.validation");
function signupLogic(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { parsedUser } = yield (0, user_validation_1.signupValidation)(req.body);
            const successStatus = parsedUser.success;
            if (!successStatus) {
                const errMsg = parsedUser.error.issues[0].message;
                console.log(errMsg);
                res.status(400).json(errMsg);
                return;
            }
            console.log(parsedUser);
            console.log(`signup request`);
            const signupData = parsedUser.data;
            const newUser = new users_model_1.UserModel(signupData);
            const savedUser = yield newUser.save();
            res.status(201).json(savedUser);
        }
        catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
                res.status(500).json(`Internal Server Error`);
                return;
            }
            console.log(err);
            res.status(500).json(`Internal Server Error`);
        }
    });
}
exports.signupLogic = signupLogic;
function loginLogic(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(`login request`);
        // res.json(`this is the login endpoint`);
        try { }
        catch (err) { }
    });
}
exports.loginLogic = loginLogic;
function logoutLogic(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`logout request`);
        res.json(`this is the logout endpoint`);
    });
}
exports.logoutLogic = logoutLogic;
function deleteUserLogic(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`delete user request`);
        res.json(`this is the delete user endpoint`);
    });
}
exports.deleteUserLogic = deleteUserLogic;
