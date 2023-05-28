"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShortUrl = void 0;
const valid_url_1 = require("valid-url");
const shortid_1 = require("shortid");
const baseUrl = `localhost:1111/`; // what about when you deploy it?
// @route POST /api/v1
// @desc create short url
function createShortUrl(req, res) {
    try {
        const { longUrl, customUrl } = req.body;
        if ((0, valid_url_1.isUri)(longUrl)) {
            if (customUrl) {
                const urlCode = customUrl;
                console.log(urlCode);
                res.status(201).send(urlCode);
            }
            else {
                const urlCode = (0, shortid_1.generate)(); // @desc typical code generated: 5E7zAwSfG
                console.log(urlCode);
                res.status(201).send(urlCode);
            }
        }
        else {
            res.status(404).send({ errMsg: `Please enter a valid url.` });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
            res.send({ errMsg: `Internal Server Error` });
        }
        else {
            console.error(err);
            res.send({ errMsg: `Internal Server Error` });
        }
    }
}
exports.createShortUrl = createShortUrl;
