import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";
import { GetPublicKeyOrSecret, Secret, verify } from "jsonwebtoken";

config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as Secret | GetPublicKeyOrSecret;

function verifyJwtToken(req: Request, res: Response, next: NextFunction) {
    const jwtToken = req.cookies.jwt;
    if (!jwtToken) return res.status(401).json(`401 Unathorized. Login or signup to continue`); // Or res.redirect
    verify(jwtToken, JWT_SECRET_KEY, (err, verifiedToken) => {
        if (err) {
            console.log(err.message);
            res.status(401).json(`401 Unathorized`);    // or res.redirect
        }
        console.log(verifiedToken);
        next();
    });
}

export { verifyJwtToken };