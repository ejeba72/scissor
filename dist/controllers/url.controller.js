"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShortUrl = void 0;
const valid_url_1 = require("valid-url");
// @route POST /api/v1
// @desc create short url
function createShortUrl(req, res) {
    try {
        const { longUrl } = req.body;
        let emma = (0, valid_url_1.isUri)(longUrl);
        // if (emma) {
        //     console.log(`uri is valid`);
        //     res.send(`url is valid`);
        // } else {
        //     console.log(`url is not valid o!`);
        //     res.send(`url is not valid o!`);
        // }
        console.log(emma);
        res.send(emma);
        // if (isUri(longUrl)) {
        // }
        // switch (validUrl.isUri(longUrl)) {
        //     case true:
        // }
        // console.log(longUrl);
        // res.status(201).send(longUrl);
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
