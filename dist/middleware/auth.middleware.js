"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwtToken = void 0;
const dotenv_1 = require("dotenv");
const jsonwebtoken_1 = require("jsonwebtoken");
(0, dotenv_1.config)();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
function verifyJwtToken(req, res, next) {
    const jwtToken = req.cookies.jwt;
    if (!jwtToken)
        return res.status(401).json(`401 Unathorized. Login or signup to continue`); // Or res.redirect
    (0, jsonwebtoken_1.verify)(jwtToken, JWT_SECRET_KEY, (err, verifiedToken) => {
        if (err) {
            console.log(err.message);
            res.status(401).json(`401 Unathorized`); // or res.redirect
        }
        console.log(verifiedToken);
        next();
    });
}
exports.verifyJwtToken = verifyJwtToken;
