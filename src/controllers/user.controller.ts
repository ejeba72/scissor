import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { ZSignupSchema } from "../validations/user.validation";
import { config } from "dotenv";
import { sign } from 'jsonwebtoken';

config();
const expiration: number = 60 * 60 * 24 * 3;
const JWT_SECRET_KEY: string | undefined = process.env.JWT_SECRET_KEY;

function createJwtToken(id: string): string {
    console.log({ id, expiration });
    if (JWT_SECRET_KEY !== undefined) {
        return sign({ id }, JWT_SECRET_KEY, { expiresIn: expiration });
    }
    throw Error('JWT_SECRET_KEY is undefined');
}
async function signupLogic(req: Request, res: Response) {
    try {
        if (Object.keys(req.body).length === 0) return res.status(400).json({ errMsg: `bad request` });
        const validatedUser = ZSignupSchema.safeParse(req.body);
        const successStatus = validatedUser.success;
        if (!successStatus) {
            const errMsg = validatedUser.error.issues[0].message;
            return res.status(400).json({ errMsg });
        }
        const userExist = await UserModel.findOne({ $or: [{ email: validatedUser.data.email }, { username: validatedUser.data.username }] });
        if (userExist) return res.status(400).json({ errMsg: `User already exists` });
        const signupData = validatedUser.data;
        const newUser = new UserModel(signupData);
        const savedUser = await newUser.save();
        const jwtToken = createJwtToken(savedUser._id.toString());
        res.cookie('jwt', jwtToken, { httpOnly: true, maxAge: expiration * 1000, sameSite: "lax", secure: true, });
        res.status(201).json({ signup: true });
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err.message);
            return res.status(400).json({ errMsg: err.message });
        }
        console.log(err);
        res.status(400).json({ errMsg: err });
    }
}
async function loginLogic(req: Request, res: Response) {
    try {
        if (Object.keys(req.body).length === 0) return res.status(400).json({ errMsg: `bad request` });
        const { emailOrUsername, password } = req.body;
        console.log({ emailOrUsername, password })
        const authenticatedUser = await UserModel.authenticate(emailOrUsername, password);
        const jwtToken = createJwtToken(authenticatedUser._id);
        res.cookie('jwt', jwtToken, { httpOnly: true, maxAge: expiration * 1000, sameSite: "lax", secure: true, });
        res.status(200).json({ login: true });
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            return res.status(400).json({ errMsg: err.message });
        }
        console.error(err);
        res.status(400).json({ errMsg: err });
    }
}
async function logoutLogic(req: Request, res: Response) {
    res.clearCookie('jwt');
    res.status(302).redirect('/');
}
async function deleteUserLogic(req: Request, res: Response) {
    console.log(`delete user request`);
    res.json(`this is the delete user endpoint`);
}

export { signupLogic, loginLogic, logoutLogic, deleteUserLogic, };








// // BEHIND THE SCENES
/* ********************************************************************************* */
// async function loginLogic(req: Request, res: Response) {
//     try {
//         const { email, username, password } = req.body;
//         // const userExist = (await UserModel.find({ email }))[0] || (await UserModel.find({ username }))[0]     // find({ email })[0] is the same as findOne({ email })
//         // if (!userExist) return res.status(400).json({ errMsg: `Invalid email (or username) and password` });
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
//         res.cookie('jwt', jwtToken, { httpOnly: true, maxAge: expiration * 1000, sameSite: "lax", secure: true, });
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