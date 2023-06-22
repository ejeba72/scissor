import { Schema, model } from "mongoose";

const analyticSchema = new Schema({shortUrl : String});

const AnalyticModel = model('Url', analyticSchema);

export { AnalyticModel };