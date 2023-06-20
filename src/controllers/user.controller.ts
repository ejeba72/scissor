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
    res.json({ errMsg: `this is the delete user endpoint` });
}

export { signupLogic, loginLogic, logoutLogic, deleteUserLogic, };