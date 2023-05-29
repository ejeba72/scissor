import { config } from "dotenv";
import { Request, Response } from "express";

config();
const PORT = process.env.PORT;

// @route GET /:id
// @desc redirects from short url to long url
function redirect(req: Request, res: Response) {
    try {
        const { hostname, url } = req;
        const shortUrl = hostname + ':' + PORT + url;
        // NOTE: TRANSFER THESE COMMENTS TO THE README/DOCUMENTATION
        // check the db if there is any document that has the route (or shorturl) of the incoming request.
        // if true, redirect the long url in such document to the user with status code 302.
        // if false, return a 404 and the following message: "that short url doesn't exist, create a new short url for your the url you wish to shorten."
        
        console.log(shortUrl);
        res.send(shortUrl);
    
        // console.log(`redirect client`);
        // // res.send(`you are been redirected`);
        // res.status(302).redirect('http://github.com/ejeba72');
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