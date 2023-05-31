import { Document, Model, Schema, model } from "mongoose";

interface IUrl extends Document {
    longUrl: 'string';
    shortUrl: 'string';
};

const urlSchema: Schema<IUrl> = new Schema<IUrl>({
    longUrl: 'string',
    shortUrl: 'string',
});

const UrlModel: Model<IUrl> = model<IUrl>('Url', urlSchema);

export { UrlModel };