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
function createShortUrl(req: Request, res: Response): void {
    try {
        const { longUrl, customUrl } = req.body;
        const { hostname } = req;
        if (isUri(longUrl)) {
            let urlCode;
            if (customUrl) {
                urlCode = customUrl;
            } else {
                urlCode = generate(); // @desc typical code generated: 5E7zAwSfG
            }
            const shortUrl = hostname + ':' + PORT + '/' + urlCode;

            const newShortUrl = new UrlModel({ shortUrl, longUrl });
            newShortUrl.save();

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