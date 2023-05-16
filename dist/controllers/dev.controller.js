"use strict";
// This controller is for development purpose only
Object.defineProperty(exports, "__esModule", { value: true });
exports.postReq = exports.devController = void 0;
function devController(req, res) {
    try {
        console.log({ "messageToMary": "Take this message to Mary" });
        res.status(200).send({ messageToMary: "Take this message to Mary" });
    }
    catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
            res.status(500).send({ errMsg: 'Internal Server Error' });
        }
        else {
            console.log(err);
            res.status(500).send({ errMsg: 'Internal Server Error' });
        }
    }
}
exports.devController = devController;
function postReq(req, res) {
    try {
        const payload = req.body;
        console.log({ payload });
        res.status(201).send({ payload });
    }
    catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
            res.status(500).send({ errMsg: 'Interrnal Server Error' });
        }
        else {
            console.log(err);
            res.status(500).send({ errMsg: 'Internal Server Error' });
        }
    }
}
exports.postReq = postReq;
