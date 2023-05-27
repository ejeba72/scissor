import { Request, Response } from "express";
import { isUri } from "valid-url";
// import validUrl from "valid-url";
import {} from 'shortid';

// @route POST /api/v1
// @desc create short url
function createShortUrl(req: Request, res: Response): void {
    try {
        const { longUrl } = req.body;


        let emma = isUri(longUrl);

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