import { Schema, model } from 'mongoose';
import { z } from 'zod';

const ZUrlSchema = z.object({
    longUrl: z.string(),
    shortUrl: z.string(),
});

const urlSchema = new Schema(ZUrlSchema.shape);

const UrlModel = model('Url', urlSchema);

export { UrlModel };



// import { Document, Model, Schema, model } from "mongoose";

// interface IUrl extends Document {
//     longUrl: 'string';
//     shortUrl: 'string';
// };

// const urlSchema: Schema<IUrl> = new Schema<IUrl>({
//     longUrl: 'string',
//     shortUrl: 'string',
// });

// const UrlModel: Model<IUrl> = model<IUrl>('Url', urlSchema);

// export { UrlModel };