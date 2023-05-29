import { config } from "dotenv";
import { Request, Response } from "express";
import { UrlModel } from "../models/url.model";

config();
const PORT = process.env.PORT;

// @route GET /:id
// @desc redirects from short url to long url
async function redirect(req: Request, res: Response): Promise<void>  {
    try {
        const { hostname, url } = req;
        const shortUrl = hostname + ':' + PORT + url;
        // NOTE: TRANSFER THESE COMMENTS TO THE README/DOCUMENTATION
        // check the db if there is any document that has the route (or shorturl) of the incoming request.
        // if true, redirect the long url in such document to the user with status code 302.
        // if false, return a 404 and the following message: "that short url doesn't exist, create a new short url for your the url you wish to shorten."
        
        // console.log(shortUrl);
        // res.send(shortUrl);

        const urlDocument = await UrlModel.findOne({ shortUrl });

        if (urlDocument) {
            const longUrl = urlDocument.longUrl;
            console.log('redirecting client to ' + longUrl);
            res.status(200).redirect(longUrl);
        } else {
            console.log({ resMsg: `That short url does not exist. Please confirm that it is correct. Or create a new one.` });
            res.status(404).send({ resMsg: `That short url does not exist. Please confirm that it is correct. Or create a new one.` });
        }
    
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err.message);
            res.status(500).send({ errMsg: `Server Error` });
        } else {
            console.log(err);
            res.status(500).send({ errMsg: `Server Error` });
        }
    }
}

export { redirect };