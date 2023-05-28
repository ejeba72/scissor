import { Request, Response } from "express";
import { isUri } from "valid-url";
import { generate } from "shortid";

// @route POST /api/v1
// @desc create short url
function createShortUrl(req: Request, res: Response): void {
    try {
        const { longUrl, customUrl } = req.body;
        if (isUri(longUrl)) {
            if (customUrl) {
                const urlCode = customUrl;
                console.log(urlCode);
                res.status(201).send(urlCode);
            } else {
                const urlCode = generate(); // @desc typical code generated: 5E7zAwSfG
                console.log(urlCode);
                res.status(201).send(urlCode);
            }
        } else {
            res.status(404).send({errMsg: `Please enter a valid url.`});
        }

    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            res.send({errMsg: `Internal Server Error`});
        } else {
            console.error(err);
            res.send({errMsg: `Internal Server Error`});
        }
    }
}

export { createShortUrl };