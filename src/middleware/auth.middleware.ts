import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";
import { GetPublicKeyOrSecret, JwtPayload, Secret, verify } from "jsonwebtoken";
import { UserModel } from "../models/user.model";

config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as Secret | GetPublicKeyOrSecret;

function verifyJwtToken(req: Request, res: Response, next: NextFunction) {
    const jwtToken = req.cookies?.jwt;
    if (!jwtToken) return res.status(302).redirect('/scissor/');
    verify(jwtToken, JWT_SECRET_KEY, err => {
        if (err) return res.status(302).redirect('/scissor');
        next();
    });
}
function checkUser(req: Request, res: Response, next: NextFunction) {
    const jwtToken = req.cookies?.jwt;
    if (!jwtToken) {
        res.locals.user = null;
        return next();
    }
    verify(jwtToken, JWT_SECRET_KEY, async (err, decodedToken) => {
        if (err) {
            res.locals.user = null;
            return next();
        }
        if (typeof decodedToken === 'object' && decodedToken !== null && 'id' in decodedToken) {
            let user = await UserModel.findOne({ _id: (decodedToken as JwtPayload).id});
            console.log({user, decodedToken, decodedTokenId: (decodedToken as JwtPayload)?.id});
            res.locals.user = user;
            // res.locals.user = `You are logged in as ${user}`;
            // I intentionally did not place a 'return' keyword here. Because the next() method needs to run, for both truthy and falsy conditions.
        }
        next();
    })
}
export { verifyJwtToken, checkUser };