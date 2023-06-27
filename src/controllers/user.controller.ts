import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { UrlModel } from "../models/url.model";
import { ZSignupSchema } from "../validations/user.validation";
import { config } from "dotenv";
import { sign } from 'jsonwebtoken';
import { generateUserId } from "../utils/userId.utils";
import { Redis } from "ioredis";

config();
const expiration: number = 60 * 60 * 24 * 3;
const JWT_SECRET_KEY: string | undefined = process.env.JWT_SECRET_KEY;
const redis = new Redis();

function createJwtToken(id: string): string {
    // console.log({ id, expiration });
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
        res.status(500).render('500-page');
        if (err instanceof Error) return console.log(err.message);
        console.log(err);
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
        res.status(401).json({ errMsg: 'Invalid email (or username) and password' });
        if (err instanceof Error) return console.log(err.message);
        console.log(err);
    }
}
async function logoutLogic(req: Request, res: Response) {
    try {
        res.clearCookie('jwt');
        res.status(302).redirect('/scissor/homepage');
    } catch (err: unknown) {
        res.status(500).render('500-page');
        if (err instanceof Error) return console.log(err.message);
        return console.log(err);
    }
}
async function deleteUserLogic(req: Request, res: Response) {
    try {
        // console.log({ jwtToken: req.cookies?.jwt, JWT_SECRET_KEY });
        // const userId = generateUserId(req.cookies?.jwt, JWT_SECRET_KEY);
        // console.log({userId});
        // // delete user's url documents in mongodb url collection and redis cache
        // const urlDocuments = await UrlModel.find({ userId });
        // const redisKeys = urlDocuments.map(urlDoc => { return urlDoc.shortUrl });
        // await redis.del(...redisKeys);
        // await UrlModel.deleteMany({ userId });
        
        
        const urlDocuments = await UrlModel.find();
        console.log({urlDocuments});
        const redisKeys = urlDocuments.map(urlDoc => { return urlDoc.shortUrl });
        console.log({redisKeys});
        await redis.del(...redisKeys);
        await UrlModel.deleteMany();

        res.status(200).json({redisKeys});
    } catch (err: unknown) {
        res.status(500).render('500-page');
        if (err instanceof Error) return console.log(err.message);
        return console.log(err);
    }
}

export { signupLogic, loginLogic, logoutLogic, deleteUserLogic, };