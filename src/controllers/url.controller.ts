import { Request, Response } from 'express';
import { isUri } from 'valid-url';
import { generate } from 'shortid';
import { config } from 'dotenv';
import { UrlModel } from '../models/url.model';
import { ZUrlSchema } from '../validations/url.validation';
import { qrGenerator } from '../utils/qrcode.util';

// const baseUrl = `localhost:1111/`  // what about when you deploy it?

config();
const PORT: string | undefined = process.env.PORT;

// @route POST /api/v1
// @desc create short url  Response<any, Record<string, any>>
async function postNewShortUrl(req: Request, res: Response): Promise<unknown> {
    // Unresolved Typescript Error Message: Type 'Response<any, Record<string, any>>' is not assignable to type 'void'.
    try {
        
        if (Object.keys(req.body).length === 0) return res.status(400).json({ errMsg: `bad request` });
        const validatedUrl = ZUrlSchema.safeParse(req.body);


        console.log({ reqBody: req.body });
        console.log({ validatedUrl });

        
        const successStatus = validatedUrl.success;
        if (!successStatus) {
            const errMsg = validatedUrl.error.issues[0].message;
            return res.status(400).json(errMsg);
        }
        const { longUrl, customUrl, isQrCodeChecked } = validatedUrl.data;
        const { hostname } = req;
        let shortUrl;


        console.log({ validatedUrl, longUrl, customUrl, shortUrl });


        if (isUri(longUrl)) {
            const existingLongUrl = await UrlModel.findOne({ longUrl });
            if (existingLongUrl) {
                const resMsg = {
                    errMsg: `Hey, you previously created a short url for that link. Here it is: \nSHORT URL: ${existingLongUrl.shortUrl}, \nLONG URL: ${existingLongUrl.longUrl}`,
                };
                console.log(resMsg);
                res.status(200).send(resMsg);
                return;
            }
            let urlCode;
            if (customUrl) {
                urlCode = customUrl;
                shortUrl = hostname + ':' + PORT + '/' + urlCode;
                const existingShortUrl = await UrlModel.findOne({ shortUrl });
                if (existingShortUrl) {
                    const resMsg = {
                        errMsg: `Hey, that short url already exist. Here it is: \nSHORT URL: ${existingShortUrl.shortUrl}, \nLONG URL: ${existingShortUrl.longUrl}`
                    };
                    console.log(resMsg);
                    res.status(200).send(resMsg);
                    return;
                }
            } else {
                urlCode = generate(); // @desc typical code generated: 5E7zAwSfG
            }
            // shortUrl = hostname + ':' + PORT + '/' + urlCode;
            shortUrl = req.protocol + '://' + req.get('host') + '/' + urlCode;

            let qrcode;
            if (isQrCodeChecked) {
                qrcode = await qrGenerator(shortUrl);
            }

            const newShortUrl = new UrlModel({ shortUrl, qrcode, longUrl, });
            await newShortUrl.save();
            console.log(newShortUrl);
            // res.status(201).send(newShortUrl);
            res.status(201).json({
                shortUrlCreated: true,
                newShortUrl
            });
            
        } else {
            res.status(404).send({errMsg: `Please enter a valid long url.`});
        }
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            res.status(500).send({errMsg: `Server Error`});
        } else {
            console.error(err);
            res.status(500).send({errMsg: `Server Error`});
        }
    }
}

export { postNewShortUrl };