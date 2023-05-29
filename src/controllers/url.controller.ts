import { Request, Response } from 'express';
import { isUri } from 'valid-url';
import { generate } from 'shortid';
import { config } from 'dotenv';
import { UrlModel } from '../models/url.model';

// const baseUrl = `localhost:1111/`  // what about when you deploy it?

config();
const PORT: string | undefined = process.env.PORT;

// @route POST /api/v1
// @desc create short url
async function createShortUrl(req: Request, res: Response): Promise<void> {
    try {
        const { longUrl, customUrl } = req.body;
        const { hostname } = req;
        let shortUrl;

        if (isUri(longUrl)) {
            const existingLongUrl = await UrlModel.findOne({ longUrl });
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
                const existingShortUrl = await UrlModel.findOne({ shortUrl });
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
            } else {
                urlCode = generate(); // @desc typical code generated: 5E7zAwSfG
            }
            shortUrl = hostname + ':' + PORT + '/' + urlCode;

            const newShortUrl = new UrlModel({ shortUrl, longUrl });
            await newShortUrl.save();
            console.log(newShortUrl);
            res.status(201).send(newShortUrl);
            
        } else {
            res.status(404).send({errMsg: `Please enter a valid url.`});
        }
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            res.status(500).send({errMsg: `Server Error`});
        } else {
            console.error(err);
            res.status(500).send({errMsg: `Server Error`});
        }
    }
}

export { createShortUrl };