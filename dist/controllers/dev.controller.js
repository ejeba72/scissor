"use strict";
// This controller is for development purpose only
Object.defineProperty(exports, "__esModule", { value: true });
exports.devController = void 0;
function devController(req, res) {
    try {
        console.log(`setting up mvc structure`);
        res.status(200).send(`testing microphone eh! Terry G testing microphone eh`);
    }
    catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
            res.status(500).send(['Internal Server Error']);
        }
        else {
            console.log(err);
            res.status(500).send(['Internal Server Error']);
        }
    }
}
exports.devController = devController;
