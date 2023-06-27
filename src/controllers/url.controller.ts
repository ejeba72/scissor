import { Request, Response } from 'express';
import { isUri } from 'valid-url';
import { generate } from 'shortid';
import { config } from 'dotenv';
import { UrlModel } from '../models/url.model';
import { ZUrlSchema } from '../validations/url.validation';
import { qrGenerator, qrcodeResMsg } from '../utils/qrcode.util';
import { join } from 'path';
import { GetPublicKeyOrSecret, Secret, verify } from 'jsonwebtoken';
import { generateUserId } from '../utils/userId.utils';
import { unlink } from 'fs';
import { URL } from 'url';
import { readdir } from 'fs/promises';
import { error } from 'console';

config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as Secret | GetPublicKeyOrSecret;


// function responseAndDelete(res: Response, qrcodeImagePath: any) {

// }

// @route POST /api/v1
// @desc create short url  Response<any, Record<string, any>>
async function postNewShortUrl(req: Request, res: Response): Promise<unknown> {
    try {
        if (Object.keys(req.body).length === 0) return res.status(400).json({ errMsg: `bad request` });
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
                shortUrl = req.get('host') + '/' + urlCode;
                const existingShortUrl = await UrlModel.findOne({ shortUrl });
                if (existingShortUrl) {
                    const resMsg = {
                        errMsg: `Hey, that short url already exist. Here it is: SHORT URL: "${existingShortUrl.shortUrl}", LONG URL: "${existingShortUrl.longUrl}"`
                    };
                    res.status(200).send(resMsg);
                    return;
                }
            } else {
                urlCode = generate(); // @desc typical code generated: 5E7zAwSfG
            }
            shortUrl = req.get('host') + '/' + urlCode;
            // qrcode section
            const qrcodeFileName = urlCode + '.png';
            const qrcodeFilePath = join(__dirname, '..', '..', 'public', 'img', qrcodeFileName);
            let qrcodeFileLocation = '';
            if (qrcodeRequested) {
                await qrGenerator(qrcodeFilePath, shortUrl);
                qrcodeFileLocation = '/img/' + qrcodeFileName;
            }
            // retrieve userId from jwt cookie
            const userId = generateUserId(req.cookies?.jwt, JWT_SECRET_KEY);
            // create model and save to db
            const newShortUrl = new UrlModel({ qrcodeFileLocation, userId, shortUrl, longUrl, qrcodeRequested, });
            await newShortUrl.save();
            // response to client
            res.status(201).json({
                qrcodeFileLocation,
                shortUrlCreated: true,
                resMsg: `Short url created! Short Url: "${shortUrl}", ${qrcodeResMsg(qrcodeRequested)}, Long url: "${longUrl}."`
            });
            // if (qrcodeRequested) {
            //     await deleteQrcodeImage(qrcodeFilePath);
            // }
        } else {
            res.status(404).json({errMsg: `Please enter a valid long url.`});
        }
    } catch (err: unknown) {
        res.status(500).render('500-page');
        if (err instanceof Error) return console.error(err.message);
        console.error(err);
    }
}
// @route GET /api/v1
// @desc render dashboard page
async function getDashboard(req: Request, res: Response) {
    try {
        // const decodedToken = verify(req.cookies?.jwt, JWT_SECRET_KEY);
        // const userId = (decodedToken as any)?.id;
        // console.log({ jwtToken: req.cookies?.jwt, JWT_SECRET_KEY });
        const userId = generateUserId(req.cookies?.jwt, JWT_SECRET_KEY);
        console.log({userId});
        const urlCollection = await UrlModel.find({ userId });


        // const qrcodeRequested = '';  // actually a boolean. 1. make a collection of urls documents that require qrcode images, using the filter method.
        // // 2. get the file paths and shorturl of the documents that require qrcode images.
        // // const qrcodeFilePath = join(__dirname, '..', '..', 'public', 'img', qrcodeFileName);

        const qrcodeDocs = urlCollection.filter(doc => {
            return doc.qrcodeRequested === true;
        });
        // console.log({qrcodeDocs});
        const generatorParams = qrcodeDocs.map(doc => {
            return {
                qrcodeFilePath: join(__dirname, '..', '..', 'public', doc.qrcodeFileLocation),
                shortUrl: doc.shortUrl,
            }
        });
        // console.log({generatorParams});
        // generatorParams.forEach(params => {
        //     qrGenerator(params.qrcodeFilePath, params.shortUrl);
        // });

        generatorParams.forEach(params => {
            async function generatorFunction() {
                await qrGenerator(params.qrcodeFilePath, params.shortUrl);
            }
            generatorFunction();
        });


        // if (qrcodeRequested) {
        //     await qrGenerator(qrcodeFilePath, shortUrl);
        // }


        res.status(200).render('dashboard', { urlCollection });
    } catch (err: unknown) {
        res.status(500).render('500-page');
        if (err instanceof Error) return console.log(err.message);
        console.log(err); 
    }
}
async function deleteQrcodeImage(req: Request, res: Response) {
    try {
        // console.log({ reqBody: req.body });
        // const url = new URL(req.body.qrcodeImageToDelete);
        // const qrcodeImagePath = url.pathname;
        // console.log({ qrcodeImagePath });
        // const qrcodeFilePath = join(__dirname, '..', '..', 'public', qrcodeImagePath);
        // console.log({qrcodeFilePath});
        // await unlink(qrcodeFilePath, (err) => {
        //     if (err) throw err;
        //     console.log(`image ${qrcodeImagePath} was deleted`);
        // });

        
        // try {
        //     console.log({imageDirectory: join(__dirname, '..', '..', 'public', 'img')})
        //     const qrcodeFiles = await readdir(join(__dirname, '..', '..', 'public', 'img'));
        //     for (const qrcodeFile of qrcodeFiles)
        //     await unlink(join(__dirname, '..', '..', 'public', 'img', qrcodeFile), err => {
        //         if (err) throw err;
        //     });
        // } catch (err) {
        //     console.error(err);
        // }

        console.log(`bad guy!`);
        res.status(200).send();
    } catch (err: unknown) {
        res.status(500).send();
        if (err instanceof Error) return console.log(err.message);
        return console.log(err);
    }
}

// update, deleteOne, deleteAll
async function getUrl() {}
async function getAllUrls() {}
async function updateUrl() {}
async function deleteUrl() {}
async function deleteAllUrls() {}

export { postNewShortUrl, getDashboard, deleteQrcodeImage };