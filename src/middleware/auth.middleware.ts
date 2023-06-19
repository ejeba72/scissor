import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";
import { GetPublicKeyOrSecret, Secret, verify } from "jsonwebtoken";

config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as Secret | GetPublicKeyOrSecret;

function verifyJwtToken(req: Request, res: Response, next: NextFunction) {
    const jwtToken = req.cookies?.jwt;
    if (!jwtToken) return res.status(302).redirect('/scissor/');
    verify(jwtToken, JWT_SECRET_KEY, (err, verifiedToken) => {
        if (err) {
            console.log(err.message);
            res.status(302).redirect('/scissor');
        }
        console.log({ jwtToken, verifiedToken, });
        next();
    });
}

export { verifyJwtToken };