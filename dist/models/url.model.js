"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlModel = void 0;
const mongoose_1 = require("mongoose");
;
const urlSchema = new mongoose_1.Schema({
    longUrl: 'string',
    shortUrl: 'string',
});
const UrlModel = (0, mongoose_1.model)('Url', urlSchema);
exports.UrlModel = UrlModel;
