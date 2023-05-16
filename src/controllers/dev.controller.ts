// This controller is for development purpose only

import { Request, Response } from "express";

function devController(req: Request, res: Response): void {
    try {
        console.log(`setting up mvc structure`);
        res.status(200).send(`testing microphone eh! Terry G testing microphone eh`);

    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err.message);
            res.status(500).send(['Internal Server Error']);
        } else {
            console.log(err);
            res.status(500).send(['Internal Server Error']);
        }
    }
}

export { devController };