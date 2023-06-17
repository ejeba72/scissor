"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlModel = void 0;
const mongoose_1 = require("mongoose");
;
const UrlSchema = new mongoose_1.Schema({
    longUrl: 'string',
    shortUrl: 'string',
    qrcode: 'string',
    clicks: {
        type: Number,
        default: 0,
    },
    clickDetails: [
        {
            timestamp: { type: Date, default: Date.now },
            referrer: String,
            userAgent: String,
        },
    ],
}, { timestamps: true });
/*
- Analytics:
Scissor provides basic analytics that allow users to track their shortened URL's performance. Users can see how many clicks their shortened URL has received and where the clicks are coming from. We need to track when a URL is used.
==> GOALS:
1. Number of clicks
2. Sources of clicks
3. When a Url is used
*/
const UrlModel = (0, mongoose_1.model)('Url', UrlSchema);
exports.UrlModel = UrlModel;
// BEHIND THE SCENES:
/* ********************************************************************************* */
// import { Model, Schema, model } from "mongoose";
// import { string, z } from "zod";
// const ZUrlSchema = z.object({
//     longUrl: z.string(),
//     shortUrl: z.string(),
// });
// type UrlType = z.infer<typeof ZUrlSchema>;
// const urlSchema: Schema<UrlType> = new Schema<UrlType>({
//     longUrl: string,
//     shortUrl: string,
// });
// const UrlModel: Model<UrlType> = model<UrlType>('Url', urlSchema);
// export { UrlModel };
/* ********************************************************************************* */
// import { Schema, model } from 'mongoose';
// import { z } from 'zod';
// const ZUrlSchema = z.object({
//     longUrl: z.string(),
//     shortUrl: z.string(),
// });
// const urlSchema = new Schema(ZUrlSchema.shape);
// const UrlModel = model('Url', urlSchema);
// export { UrlModel };
