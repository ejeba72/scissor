"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirect = void 0;
const dotenv_1 = require("dotenv");
const url_model_1 = require("../models/url.model");
(0, dotenv_1.config)();
const PORT = process.env.PORT;
// @route GET /:id
// @desc redirects from short url to long url
function redirect(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { hostname, url } = req;
            const shortUrl = hostname + ':' + PORT + url;
            // NOTE: TRANSFER THESE COMMENTS TO THE README/DOCUMENTATION
            // check the db if there is any document that has the route (or shorturl) of the incoming request.
            // if true, redirect the long url in such document to the user with status code 302.
            // if false, return a 404 and the following message: "that short url doesn't exist, create a new short url for your the url you wish to shorten."
            // console.log(shortUrl);
            // res.send(shortUrl);
            const urlDocument = yield url_model_1.UrlModel.findOne({ shortUrl });
            if (urlDocument) {
                const longUrl = urlDocument.longUrl;
                console.log('redirecting client to ' + longUrl);
                res.status(200).redirect(longUrl);
            }
            else {
                console.log({ resMsg: `That short url does not exist. Please confirm that it is correct. Or create a new one.` });
                res.status(404).send({ resMsg: `That short url does not exist. Please confirm that it is correct. Or create a new one.` });
            }
        }
        catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
                res.status(500).send({ errMsg: `Server Error` });
            }
            else {
                console.log(err);
                res.status(500).send({ errMsg: `Server Error` });
            }
        }
    });
}
exports.redirect = redirect;
