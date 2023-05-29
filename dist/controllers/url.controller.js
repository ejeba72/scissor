"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShortUrl = void 0;
const valid_url_1 = require("valid-url");
const shortid_1 = require("shortid");
const dotenv_1 = require("dotenv");
const url_model_1 = require("../models/url.model");
// const baseUrl = `localhost:1111/`  // what about when you deploy it?
(0, dotenv_1.config)();
const PORT = process.env.PORT;
// @route POST /api/v1
// @desc create short url
function createShortUrl(req, res) {
    try {
        const { longUrl, customUrl } = req.body;
        const { hostname } = req;
        if ((0, valid_url_1.isUri)(longUrl)) {
            let urlCode;
            if (customUrl) {
                urlCode = customUrl;
            }
            else {
                urlCode = (0, shortid_1.generate)(); // @desc typical code generated: 5E7zAwSfG
            }
            const shortUrl = hostname + ':' + PORT + '/' + urlCode;
            const newShortUrl = new url_model_1.UrlModel({ shortUrl, longUrl });
            newShortUrl.save();
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
}
exports.createShortUrl = createShortUrl;
