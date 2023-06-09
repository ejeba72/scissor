import { Request, Response } from "express";

async function signupLogic(req: Request, res: Response) {
    console.log(`signup request`);
    res.json(`this is the signup endpoint`);
}

async function loginLogic(req: Request, res: Response) {
    console.log(`login request`);
    res.json(`this is the login endpoint`);
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