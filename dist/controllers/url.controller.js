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
exports.postNewShortUrl = void 0;
const valid_url_1 = require("valid-url");
const shortid_1 = require("shortid");
const dotenv_1 = require("dotenv");
const url_model_1 = require("../models/url.model");
const url_validation_1 = require("../validations/url.validation");
// const baseUrl = `localhost:1111/`  // what about when you deploy it?
(0, dotenv_1.config)();
const PORT = process.env.PORT;
// @route POST /api/v1
// @desc create short url  Response<any, Record<string, any>>
function postNewShortUrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Unresolved Typescript Error Message: Type 'Response<any, Record<string, any>>' is not assignable to type 'void'.
        try {
            if (Object.keys(req.body).length === 0)
                return res.status(400).json(`bad request`);
            const validatedUrl = url_validation_1.ZUrlSchema.safeParse(req.body);
            console.log({ reqBody: req.body });
            console.log({ validatedUrl });
            const successStatus = validatedUrl.success;
            if (!successStatus) {
                const errMsg = validatedUrl.error.issues[0].message;
                return res.status(400).json(errMsg);
            }
            const { longUrl, customUrl } = validatedUrl.data;
            const { hostname } = req;
            let shortUrl;
            console.log({ validatedUrl, longUrl, customUrl, shortUrl });
            if ((0, valid_url_1.isUri)(longUrl)) {
                const existingLongUrl = yield url_model_1.UrlModel.findOne({ longUrl });
                if (existingLongUrl) {
                    const resMsg = {
                        msg: 'Hey, you previously created a short url for that link. Here it is:',
                        longUrl: existingLongUrl.longUrl,
                        shortUrl: existingLongUrl.shortUrl,
                    };
                    console.log(resMsg);
                    res.status(200).send(resMsg);
                    return;
                }
                let urlCode;
                if (customUrl) {
                    urlCode = customUrl;
                    shortUrl = hostname + ':' + PORT + '/' + urlCode;
                    const existingShortUrl = yield url_model_1.UrlModel.findOne({ shortUrl });
                    if (existingShortUrl) {
                        const resMsg = {
                            msg: 'Hey, that short url already exist. Here it is:',
                            shortUrl: existingShortUrl.shortUrl,
                            longUrl: existingShortUrl.longUrl,
                        };
                        console.log(resMsg);
                        res.status(200).send(resMsg);
                        return;
                    }
                }
                else {
                    urlCode = (0, shortid_1.generate)(); // @desc typical code generated: 5E7zAwSfG
                }
                shortUrl = hostname + ':' + PORT + '/' + urlCode;
                const newShortUrl = new url_model_1.UrlModel({ shortUrl, longUrl });
                yield newShortUrl.save();
                console.log(newShortUrl);
                res.status(201).send(newShortUrl);
            }
            else {
                res.status(404).send({ errMsg: `Please enter a valid url.` });
            }
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(err.message);
                res.status(500).send({ errMsg: `Server Error` });
            }
            else {
                console.error(err);
                res.status(500).send({ errMsg: `Server Error` });
            }
        }
    });
}
exports.postNewShortUrl = postNewShortUrl;
// @route PUT /api/v1
// @desc modify short or long field of url document
function modifyUrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () { });
}
