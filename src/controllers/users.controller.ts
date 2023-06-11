import { Request, Response } from "express";
import { UserModel, ZUser } from "../models/users.model";

async function signupLogic(req: Request, res: Response) {
    try {
        const parsedUser = ZUser.safeParse(req.body);
        const successStatus = parsedUser.success;
        if (!successStatus) {
            const errMsg = parsedUser.error.issues[0].message;
            return res.status(400).json(errMsg);
        }
        const userExist = (await UserModel.findOne({ email: parsedUser.data.email }) || await UserModel.findOne({ username: parsedUser.data.username }));
        if (userExist) {
            return res.status(400).json(`User already exists`);
        }
        const signupData = parsedUser.data;
        const newUser = new UserModel(signupData);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err.message);
            return res.status(500).json(`Internal Server Error`);
        }
        console.log(err);
        res.status(500).json(`Internal Server Error`);
    }
}

async function loginLogic(req: Request, res: Response) {
    try {
        const { email, username, password } = req.body;
        const userExist = (await UserModel.find({ email }))[0] || (await UserModel.find({ username }))[0]     // find({ email })[0] is the same as findOne({ email })
        if (!userExist) {
            return res.status(400).json(`Invalid email (or username) and password`);
        }
        const passwordFromClient = password;
        const passwordFromDb = userExist.password;
        if (passwordFromClient !== passwordFromDb) {
            return res.status(400).json(`Invalid email (or username) and password`);
        }
        res.status(200).json(`logged in`);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            return res.status(500).json(`Internal Server Error`);
        }
        console.error(err);
        res.status(500).json(`Internal Server Error`);
    }
}

async function logoutLogic(req: Request, res: Response) {
    console.log(`logout request`);
    res.json(`this is the logout endpoint`);
}

async function deleteUserLogic(req: Request, res: Response) {
    console.log(`delete user request`);
    res.json(`this is the delete user endpoint`);
}

export { signupLogic, loginLogic, logoutLogic, deleteUserLogic };