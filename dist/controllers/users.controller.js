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
function signupLogic(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parsedUser = users_model_1.ZUser.safeParse(req.body);
            const successStatus = parsedUser.success;
            if (!successStatus) {
                const errMsg = parsedUser.error.issues[0].message;
                return res.status(400).json(errMsg);
            }
            const userExist = ((yield users_model_1.UserModel.findOne({ email: parsedUser.data.email })) || (yield users_model_1.UserModel.findOne({ username: parsedUser.data.username })));
            if (userExist) {
                return res.status(400).json(`User already exists`);
            }
            const signupData = parsedUser.data;
            const newUser = new users_model_1.UserModel(signupData);
            const savedUser = yield newUser.save();
            res.status(201).json(savedUser);
        }
        catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
                return res.status(500).json(`Internal Server Error`);
            }
            console.log(err);
            res.status(500).json(`Internal Server Error`);
        }
    });
}
exports.signupLogic = signupLogic;
function loginLogic(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, username, password } = req.body;
            const userExist = (yield users_model_1.UserModel.find({ email }))[0] || (yield users_model_1.UserModel.find({ username }))[0]; // find({ email })[0] is the same as findOne({ email })
            if (!userExist) {
                return res.status(400).json(`Invalid email (or username) and password`);
            }
            const passwordFromClient = password;
            const passwordFromDb = userExist.password;
            if (passwordFromClient !== passwordFromDb) {
                return res.status(400).json(`Invalid email (or username) and password`);
            }
            res.status(200).json(`logged in`);
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(err.message);
                return res.status(500).json(`Internal Server Error`);
            }
            console.error(err);
            res.status(500).json(`Internal Server Error`);
        }
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
