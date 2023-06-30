import { Request, Response } from "express";
import { isUri } from "valid-url";
import { generate } from "shortid";
import { config } from "dotenv";
import { UrlModel } from "../models/url.model";
import { ZUrlSchema } from "../validations/url.validation";
import { qrGenerator, qrcodeResMsg } from "../utils/qrcode.util";
import { join } from "path";
import { GetPublicKeyOrSecret, Secret, verify } from "jsonwebtoken";
import { generateUserId } from "../utils/userId.utils";
import { readdir, unlink } from "fs/promises";
import { error, log } from "console";

config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as
  | Secret
  | GetPublicKeyOrSecret;

// @route POST /api/v1
// @desc create short url  Response<any, Record<string, any>>
async function postNewShortUrl(req: Request, res: Response): Promise<unknown> {
  try {
    if (Object.keys(req.body).length === 0)
      return res.status(400).json({ errMsg: `bad request` });
    const validatedUrl = ZUrlSchema.safeParse(req.body);
    const successStatus = validatedUrl.success;
    if (!successStatus) {
      const errMsg = validatedUrl.error.issues[0].message;
      return res.status(400).json(errMsg);
    }
    const { longUrl, customUrl, qrcodeRequested } = validatedUrl.data;
    let shortUrl: string;
    // long url validation
    if (isUri(longUrl)) {
      const existingLongUrl = await UrlModel.findOne({ longUrl });
      if (existingLongUrl) {
        const resMsg = {
          errMsg: `Hey, you previously created a short url for that link. Here it is: SHORT URL: "${existingLongUrl.shortUrl}", LONG URL: "${existingLongUrl.longUrl}"`,
        };
        res.status(200).send(resMsg);
        return;
      }
      let urlCode;
      if (customUrl) {
        urlCode = customUrl;
        shortUrl = req.get("host") + "/" + urlCode;
        const existingShortUrl = await UrlModel.findOne({ shortUrl });
        if (existingShortUrl) {
          const resMsg = {
            errMsg: `Hey, that short url already exist. Here it is: SHORT URL: "${existingShortUrl.shortUrl}", LONG URL: "${existingShortUrl.longUrl}"`,
          };
          res.status(200).send(resMsg);
          return;
        }
      } else {
        urlCode = generate(); // @desc typical code generated: 5E7zAwSfG
      }
      shortUrl = req.get("host") + "/" + urlCode;
      // qrcode section
      const qrcodeFileName = urlCode + ".png";
      const qrcodeFilePath = join(
        __dirname,
        "..",
        "..",
        "public",
        "img",
        qrcodeFileName
      );
      let qrcodeFileLocation = "";
      if (qrcodeRequested) {
        await qrGenerator(qrcodeFilePath, shortUrl);
        qrcodeFileLocation = "/img/" + qrcodeFileName;
      }
      // retrieve userId from jwt cookie
      const userId = generateUserId(req.cookies?.jwt, JWT_SECRET_KEY);
      // create model and save to db
      const newShortUrl = new UrlModel({
        qrcodeFileLocation,
        userId,
        shortUrl,
        longUrl,
        qrcodeRequested,
      });
      await newShortUrl.save();
      // response to client
      res.status(201).json({
        qrcodeFileLocation,
        shortUrlCreated: true,
        resMsg: `Short url created! Short Url: "${shortUrl}", ${qrcodeResMsg(
          qrcodeRequested
        )}, Long url: "${longUrl}."`,
      });
      // if (qrcodeRequested) {
      //     await deleteQrcodeImage(qrcodeFilePath);
      // }
    } else {
      res.status(404).json({ errMsg: `Please enter a valid long url.` });
    }
  } catch (err: unknown) {
    res.status(500).render("500-page");
    if (err instanceof Error) return error(err.message);
    error(err);
  }
}
// @route GET /api/v1
// @desc render dashboard page
async function getDashboard(req: Request, res: Response) {
  try {
    const userId = generateUserId(req.cookies?.jwt, JWT_SECRET_KEY);
    // log({ userId });
    const urlCollection = await UrlModel.find({ userId });
    const qrcodeDocs = urlCollection.filter((doc) => {
      return doc.qrcodeRequested === true;
    });
    const generatorParams = qrcodeDocs.map((doc) => {
      return {
        qrcodeFilePath: join(
          __dirname,
          "..",
          "..",
          "public",
          doc.qrcodeFileLocation
        ),
        shortUrl: doc.shortUrl,
      };
    });
    generatorParams.forEach((params) => {
      async function generatorFunction() {
        await qrGenerator(params.qrcodeFilePath, params.shortUrl);
      }
      generatorFunction();
    });
    res.status(200).render("dashboard", { urlCollection, isDashboard: true });
  } catch (err: unknown) {
    res.status(500).render("500-page");
    if (err instanceof Error) return log(err.message);
    log(err);
  }
}
async function deleteQrcodeImages(req: Request, res: Response) {
  try {
    const dirPath = join(__dirname, "..", "..", "public", "img");
    const files = await readdir(dirPath);
    // log({filesBeforeDel: files});
    const deleteFilePromises = files.map((file) => unlink(join(dirPath, file)));
    await Promise.all(deleteFilePromises);
    // log(`bad guy!`);
    res.status(200).send(); // empty response is intentional
  } catch (err: unknown) {
    res.status(500).send();
    if (err instanceof Error) return log(err.message);
    return log(err);
  }
}

// update, deleteOne, deleteAll
async function updateUrl(req: Request, res: Response) {
  try {
    log({ reqBody: req.body });
    log(`url update request`);
    res.status(200).json({ resMsg: "Your short url has been updated." });
  } catch (err: unknown) {
    if (err instanceof Error) return log(err.message);
    return log(err);
    res.status(500).render("500-page");
  }
}
async function deleteUrl(req: Request, res: Response) {
  try {
    log({ reqBody: req.body });
    // retrieve the payload from the request body
    const { findUrl, deleteAll } = req.body;
    log({ findUrl, deleteAll });
    // retrieve userId from jwt cookie
    const userId = generateUserId(req.cookies?.jwt, JWT_SECRET_KEY);
    // log({ userId });
    if (deleteAll) {
      const deletedMany = await UrlModel.deleteMany({ userId });
      log({ deletedMany });
      log(`deleted all urls`);
      return res.status(200).json({ errMsg: `deleted all URLs` });
    }
    const deletedOne = await UrlModel.deleteOne({
      $and: [{ userId }, { shortUrl: findUrl }],
    });
    log({ deletedOne });
    log(`deleted one url`);
    res.status(200).json({ resMsg: { message: `URL deleted!` } });
  } catch (err: unknown) {
    if (err instanceof Error) return log(err.message);
    return log(err);
    res.status(500).render("500-page");
  }
}

export {
  postNewShortUrl,
  getDashboard,
  deleteQrcodeImages,
  updateUrl,
  deleteUrl,
};
