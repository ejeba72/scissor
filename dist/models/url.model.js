"use strict";
// import { Model, Schema, model } from "mongoose";
// import { string, z } from "zod";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlModel = void 0;
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
// import { Schema, model } from 'mongoose';
// import { z } from 'zod';
// const ZUrlSchema = z.object({
//     longUrl: z.string(),
//     shortUrl: z.string(),
// });
// const urlSchema = new Schema(ZUrlSchema.shape);
// const UrlModel = model('Url', urlSchema);
// export { UrlModel };
const mongoose_1 = require("mongoose");
;
const urlSchema = new mongoose_1.Schema({
    longUrl: 'string',
    shortUrl: 'string',
});
const UrlModel = (0, mongoose_1.model)('Url', urlSchema);
exports.UrlModel = UrlModel;
