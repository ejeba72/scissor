"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirect = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const PORT = process.env.PORT;
// @route GET /:id
// @desc redirects from short url to long url
function redirect(req, res) {
    try {
        const { hostname, url } = req;
        const shortUrl = hostname + ':' + PORT + url;
        // check the db if there is any document that has the route (or shorturl) of the incoming request.
        // if true, redirect the long url in such document to the user with status code 302.
        // if false, return a 404 and the following message: "that short url doesn't exist, create a new short url for your the url you wish to shorten."
        console.log(shortUrl);
        res.send(shortUrl);
        // console.log(`redirect client`);
        // // res.send(`you are been redirected`);
        // res.status(302).redirect('http://github.com/ejeba72');
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
}
exports.redirect = redirect;
