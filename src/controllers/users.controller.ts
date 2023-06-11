import { Request, Response } from "express";
import { UserModel, ZUser } from "../models/users.model";
import { z } from "zod";

async function signupLogic(req: Request, res: Response) {

    try {
        const parsedUser = ZUser.safeParse(req.body);
        const successStatus = parsedUser.success;
        if (!successStatus) {
            const errMsg = parsedUser.error.issues[0].message;
            console.log(errMsg);
            res.status(400).json(errMsg);
            return;
        }
        const userExist = (await UserModel.findOne({ email: parsedUser.data.email }) || await UserModel.findOne({ username: parsedUser.data.username }));
        if (userExist) {
            console.log([`The following user already exist:`, userExist]);
            res.status(400).json(`User already exists`);
            return;
        }
        console.log(parsedUser);
        console.log(`signup request`);
        const signupData = parsedUser.data;
        const newUser = new UserModel(signupData);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err.message);
            res.status(500).json(`Internal Server Error`);
            return;
        }
        console.log(err);
        res.status(500).json(`Internal Server Error`);
    }
}

async function loginLogic(req: Request, res: Response) {
    try {
        const { email, username, password } = req.body;
        const userId = email || username;
        const userExist = (await UserModel.find({ email }))[0] || (await UserModel.find({ username }))[0]     // find({ email })[0] is the same as findOne({ email })
        if (!userExist) {
            console.log(`Invalid email (or username) and password`);
            res.status(400).json(`Invalid email (or username) and password`);
            return;
        }
        const passwordFromClient = password;
        const passwordFromDb = userExist.password;
        if (passwordFromClient !== passwordFromDb) {
            console.log(`Invalid email (or username) and password`);
            res.status(400).json(`Invalid email (or username) and password`);
            return;
        }
        console.log(`logged in`);
        res.status(200).json(`logged in`);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            res.status(500).json(`Internal Server Error`);
            return;
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