import { config } from 'dotenv';
import { Request, Response } from 'express';
import { UrlModel } from '../models/url.model';
import { Redis } from 'ioredis';

config();
const PORT = process.env.PORT;
const redis = new Redis();

// console.log timestamp: new Date(), referrer: req.get('Referrer'), userAgent: req.get('User-Agent'), in the getRedirect route.

// @route GET /:id
// @desc redirects from short url to long url
async function getRedirect(req: Request, res: Response): Promise<void>  {
    try {
        const { hostname, url } = req;
        const shortUrl = hostname + ':' + PORT + url;

        async function analytics(doc: any): Promise<void> {
            doc.clicks += 1;
            doc.clickDetails.push({
                timestamp: new Date(),
                referrer: req.headers.referer,
                userAgent: req.headers['user-agent'],
            });
            await doc.save();
            // console.log({ clicks: doc.clicks, referrer: req.headers.referer });
            console.log(req.headers);
            // console.log({ clicks: doc.clicks, timestamp: doc.clickDetails.timestamp, referrer: doc.clickDetails.referer, userAgent: doc.clickDetails.userAgent, });
            // console.log({ clicks: doc.clicks, clickDetails: doc.clickDetails});
        }


        // NOTE: TRANSFER THESE COMMENTS TO THE README/DOCUMENTATION
        // Attempt to retrive... ...check the cache if the route (or shorturl) of the incoming request is an existing key in the cache.
        // if true (i.e. if cache hit), parse the value of such key, and use it as the argument (ie longUrl) for a redirect.
        // otherwise (ie if cache miss), ...attempt to retrieve... ...check the db if there is any document that has the route (or shorturl) of the incoming request.
        // save such shortUrl and longUrl as key-value pairs in cache.
        // use the longUrl to redirect the client with status code 302.
        // if false, return a 404 and the following message: "that short url doesn't exist, create a new short url for your the url you wish to shorten."

        let LongUrl: string | null = await redis.get(shortUrl);

        if (LongUrl) {
            let cachedLongUrl: string = LongUrl as string;
            cachedLongUrl = JSON.parse(cachedLongUrl);
            console.log({ cachedLongUrl, 'source' : 'cache' });
            res.status(302).redirect(cachedLongUrl);
            const urlDocument = await UrlModel.findOne({ shortUrl });
            analytics(urlDocument);
            return;
        }
        
        const urlDocument = await UrlModel.findOne({ shortUrl });
        if (urlDocument) {
            const dbLongUrl = urlDocument.longUrl;
            redis.set(shortUrl, JSON.stringify(dbLongUrl), 'EX', 15);
            console.log({ dbLongUrl, 'source' : 'database' });
            res.status(302).redirect(dbLongUrl);
            analytics(urlDocument);
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

export { getRedirect };