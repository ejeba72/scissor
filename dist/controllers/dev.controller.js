"use strict";
// This controller is for development purpose only
Object.defineProperty(exports, "__esModule", { value: true });
exports.postReq = exports.getReq = void 0;
function getReq(req, res) {
    try {
        console.log({ "successfulGetReq": "A Get request was made to the '/dev' route." });
        res.status(200).send({ getReqPayload: "Your test Get request is successful!" });
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
exports.getReq = getReq;
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
