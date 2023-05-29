import { Request, Response } from "express";
import { isUri } from "valid-url";
import { generate } from "shortid";

const baseUrl = `localhost:1111/`  // what about when you deploy it?

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
            res.status(500).send({errMsg: `Server Error`});
        } else {
            console.error(err);
            res.status(500).send({errMsg: `Server Error`});
        }
    }
}

export { createShortUrl };