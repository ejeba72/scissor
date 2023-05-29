// This controller is for development purpose only

import { Request, Response } from 'express';

function getReq(req: Request, res: Response): void {
    try {
        console.log({ "successfulGetReq": "A Get request was made to the '/dev' route." });
        res.status(200).send({ getReqPayload: "Your test Get request is successful!" });

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

export { getReq, postReq };