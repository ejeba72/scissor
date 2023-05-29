import { Schema, model } from "mongoose";

const urlSchema = new Schema({
    longUrl: 'string',
    shortUrl: 'string',
})

const UrlModel = model('Url', urlSchema);

export { UrlModel };