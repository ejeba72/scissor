import { Request, Response } from "express";
import { UserModel } from "../models/users.model";
import { z } from "zod";
import { signupValidation } from "../validations/user.validation";




async function signupLogic(req: Request, res: Response) {

    try {
        const { parsedUser } = await signupValidation(req.body);
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
    // console.log(`login request`);
    // res.json(`this is the login endpoint`);
    try {} catch (err: unknown) {}
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