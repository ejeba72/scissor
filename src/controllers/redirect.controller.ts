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
        // check the db if there is any document that has the route of the incoming request.
        // if false, return a 404 and "that short url doesn't exist, create a new short url for your the url you wish to shorten." message
        // if true, redirect the long url in such document to the user.
        
        console.log(shortUrl);
        res.send(shortUrl);
    
        // console.log(`redirect client`);
        // // res.send(`you are been redirected`);
        // res.status(302).redirect('http://github.com/ejeba72');
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err.message);
            res.send(err.message);
        } else {
            console.log(err);
            res.send(err);
        }
    }
}

export { redirect };