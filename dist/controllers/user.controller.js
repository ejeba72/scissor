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
const user_model_1 = require("../models/user.model");
const user_validation_1 = require("../validations/user.validation");
const dotenv_1 = require("dotenv");
const jsonwebtoken_1 = require("jsonwebtoken");
(0, dotenv_1.config)();
const expiration = 60 * 60 * 24 * 3;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
function createJwtToken(id) {
    console.log({ id, JWT_SECRET_KEY, expiration });
    if (JWT_SECRET_KEY !== undefined) {
        return (0, jsonwebtoken_1.sign)({ id }, JWT_SECRET_KEY, { expiresIn: expiration });
    }
    throw Error('JWT_SECRET_KEY is undefined');
}
function signupLogic(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (Object.keys(req.body).length === 0)
                return res.status(400).json(`bad request`);
            const validatedUser = user_validation_1.ZUser.safeParse(req.body);
            const successStatus = validatedUser.success;
            if (!successStatus) {
                const errMsg = validatedUser.error.issues[0].message;
                return res.status(400).json(errMsg);
            }
            const userExist = ((yield user_model_1.UserModel.findOne({ email: validatedUser.data.email })) || (yield user_model_1.UserModel.findOne({ username: validatedUser.data.username })));
            if (userExist)
                return res.status(400).json(`User already exists`);
            const signupData = validatedUser.data;
            const newUser = new user_model_1.UserModel(signupData);
            const savedUser = yield newUser.save();
            const jwtToken = createJwtToken(savedUser._id.toString());
            res.cookie('jwt', jwtToken, { httpOnly: true, maxAge: expiration * 1000 });
            res.status(201).json(savedUser);
        }
        catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
                return res.status(400).json(err.message);
            }
            console.log(err);
            res.status(400).json(err);
        }
    });
}
exports.signupLogic = signupLogic;
function loginLogic(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, username, password } = req.body;
            // const userExist = (await UserModel.find({ email }))[0] || (await UserModel.find({ username }))[0]     // find({ email })[0] is the same as findOne({ email })
            // if (!userExist) return res.status(400).json(`Invalid email (or username) and password`);
            // const passwordFromClient = password;
            // const passwordFromDb = userExist.password;
            // if (passwordFromClient !== passwordFromDb) return res.status(400).json(`Invalid email (or username) and password`);
            // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            // const loginUser = await UserModel.login(email, username, password);
            // const findWithEmail = (await UserModel.find({ email }))[0];  // i.e. await UserModel.findOne({ email })
            // const findWithUsername = (await UserModel.find({ username }))[0];
            // const existingUser = findWithEmail || findWithUsername;
            // if (!existingUser) return res.status(400).json('Invalid email (or username) and password');
            // const isUserAuthenticated = await existingUser.authenticateUser(password);
            // console.log({ isUserAuthenticated });
            // if (!isUserAuthenticated) return res.status(400).json('Invalid email (or username) and password');
            const authenticatedUser = yield user_model_1.UserModel.authenticate(email, username, password);
            const jwtToken = createJwtToken(authenticatedUser._id);
            res.cookie('jwt', jwtToken, { httpOnly: true, maxAge: expiration * 1000 });
            const response = { authenticatedUser, jwtToken };
            res.status(200).json(response);
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(err.message);
                return res.status(400).json(err.message);
            }
            console.error(err);
            res.status(400).json(err);
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
// // BEHIND THE SCENES
/* ********************************************************************************* */
// async function loginLogic(req: Request, res: Response) {
//     try {
//         const { email, username, password } = req.body;
//         // const userExist = (await UserModel.find({ email }))[0] || (await UserModel.find({ username }))[0]     // find({ email })[0] is the same as findOne({ email })
//         // if (!userExist) return res.status(400).json(`Invalid email (or username) and password`);
//         // const passwordFromClient = password;
//         // const passwordFromDb = userExist.password;
//         // if (passwordFromClient !== passwordFromDb) return res.status(400).json(`Invalid email (or username) and password`);
// // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//         // const loginUser = await UserModel.login(email, username, password);
//         const findWithEmail = (await UserModel.find({ email }))[0];  // i.e. await UserModel.findOne({ email })
//         const findWithUsername = (await UserModel.find({ username }))[0];
//         const existingUser = findWithEmail || findWithUsername;
//         if (!existingUser) return res.status(400).json('Invalid email (or username) and password');
//         const isUserAuthenticated = await existingUser.authenticateUser(password);
//         console.log({ isUserAuthenticated });
//         if (!isUserAuthenticated) return res.status(400).json('Invalid email (or username) and password');
//         const jwtToken = createJwtToken(existingUser._id);
//         res.cookie('jwt', jwtToken, { httpOnly: true, maxAge: expiration * 1000 });
//         const response = { existingUser, jwtToken };
//         res.status(200).json(response);
//     } catch (err: unknown) {
//         if (err instanceof Error) {
//             console.error(err.message);
//             return res.status(400).json(err.message);
//         }
//         console.error(err);
//         res.status(400).json(err);
//     }
// }
/* ********************************************************************************* */
// async function loginLogic(req: Request, res: Response) {
//     try {
//         const { email, username, password } = req.body;
//         const userExist = (await UserModel.find({ email }))[0] || (await UserModel.find({ username }))[0]     // find({ email })[0] is the same as findOne({ email })
//         if (!userExist) return res.status(400).json(`Invalid email (or username) and password`);
//         const passwordFromClient = password;
//         const passwordFromDb = userExist.password;
//         if (passwordFromClient !== passwordFromDb) return res.status(400).json(`Invalid email (or username) and password`);
//         res.status(200).json(`logged in`);
//     } catch (err: unknown) {
//         if (err instanceof Error) {
//             console.error(err.message);
//             return res.status(500).json(`Internal Server Error`);
//         }
//         console.error(err);
//         res.status(500).json(`Internal Server Error`);
//     }
// }
/* ********************************************************************************* */ 
