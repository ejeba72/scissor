import { Document, Model, Schema, model } from "mongoose";

interface IUrlSchema extends Document {
    longUrl: 'string';
    shortUrl: 'string';
    createdAt: Date;
    updatedAt: Date;
};

const UrlSchema: Schema<IUrlSchema> = new Schema<IUrlSchema>(
    {
        longUrl: 'string',
        shortUrl: 'string',
    },
    { timestamps: true }
);

/*
- Analytics:
Scissor provides basic analytics that allow users to track their shortened URL's performance. Users can see how many clicks their shortened URL has received and where the clicks are coming from. We need to track when a URL is used.
==> GOALS:
1. Number of clicks
2. Sources of clicks
3. When a Url is used
*/

const UrlModel: Model<IUrlSchema> = model<IUrlSchema>('UrlDocument', UrlSchema);

export { UrlModel };










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