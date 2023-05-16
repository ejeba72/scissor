// This controller is for development purpose only

import { Request, Response } from "express";

function devController(req: Request, res: Response): void {
    try {
        console.log({ "messageToMary": "Take this message to Mary" });
        res.status(200).send({ messageToMary: "Take this message to Mary" });

    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err.message);
            res.status(500).send({ errMsg: 'Internal Server Error' });
        } else {
            console.log(err);
            res.status(500).send({ errMsg: 'Internal Server Error' });
        }
    }
}

function postReq(req: Request, res: Response): void {
    try {
        const payload = req.body;
        console.log({ payload });
        res.status(201).send({ payload });

    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err.message);
            res.status(500).send({ errMsg: 'Interrnal Server Error' });
        } else {
            console.log(err);
            res.status(500).send({ errMsg: 'Internal Server Error' });
        }
    }
}

export { devController, postReq };