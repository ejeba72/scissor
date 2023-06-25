import { Request, Response } from 'express';
import { isUri } from 'valid-url';
import { generate } from 'shortid';
import { config } from 'dotenv';
import { UrlModel } from '../models/url.model';
import { ZUrlSchema } from '../validations/url.validation';
import { qrGenerator } from '../utils/qrcode.util';
import { join } from 'path';

config();
const PORT: string | undefined = process.env.PORT;

// @route POST /api/v1
// @desc create short url  Response<any, Record<string, any>>
async function postNewShortUrl(req: Request, res: Response): Promise<unknown> {
    try {
        
        // console.log({reqBody: req.body});

        if (Object.keys(req.body).length === 0) return res.status(400).json({ errMsg: `bad request` });
        const validatedUrl = ZUrlSchema.safeParse(req.body);
        const successStatus = validatedUrl.success;
        if (!successStatus) {
            const errMsg = validatedUrl.error.issues[0].message;
            return res.status(400).json(errMsg);
        }
        const { longUrl, customUrl, qrcodeRequested } = validatedUrl.data;
        // const { hostname } = req;
        let shortUrl: string;
        // LONG URL VALIDATION:
        if (isUri(longUrl)) {
            const existingLongUrl = await UrlModel.findOne({ longUrl });
            if (existingLongUrl) {
                const resMsg = {
                    errMsg: `Hey, you previously created a short url for that link. Here it is: \nSHORT URL: ${existingLongUrl.shortUrl}, \nLONG URL: ${existingLongUrl.longUrl}`,
                };
                // console.log(resMsg);
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
                        errMsg: `Hey, that short url already exist. Here it is: \nSHORT URL: ${existingShortUrl.shortUrl}, \nLONG URL: ${existingShortUrl.longUrl}`
                    };
                    // console.log(resMsg);
                    res.status(200).send(resMsg);
                    return;
                }
            } else {
                urlCode = generate(); // @desc typical code generated: 5E7zAwSfG
            }
            shortUrl = req.get('host') + '/' + urlCode;
            // console.log({shortUrl});

            const qrcodeFileName = urlCode + '.png';
            const qrcodeFilePath = join(__dirname, '..', '..', 'public', 'img', qrcodeFileName);
            // console.log({qrcodeFilePath});
            // console.log({qrcodeRequested});
            let qrcodeFileLocation = '';
            if (qrcodeRequested) {
                // console.log({qrcodeRequested});
                await qrGenerator(qrcodeFilePath, shortUrl);
                qrcodeFileLocation = '/img/' + qrcodeFileName;
            }
            // console.log({qrcodeFileLocation})
            const newShortUrl = new UrlModel({ qrcodeFileLocation, shortUrl, longUrl, qrcodeRequested, });
            await newShortUrl.save();
            // console.log({ qrcodeFileName, qrcodeFilePath, newShortUrl, });

            console.log({qrcodeFileLocation});

            res.status(201).json({
                qrcodeFileLocation,
                shortUrlCreated: true,
                resMsg: `Short url created! Short Url: ${shortUrl}, QRCode: ${'was generated' || 'was not requested for'}, Long url: ${longUrl}.`
            });
            
            // res.status(201).render('dashboard', { qrcodeFileLocation });
            // res.set('Content-disposition', 'attachment; filename=qrcodeFileName');
            // res.status(201).sendFile(qrcodeFilePath);
            // // Set response header for qrcode file:
            // res.set('Content-disposition', 'attachment; filename=qrcodeFileName');
            // res.status(201).sendFile(qrcodeFilePath, () => {
                // res.json({
                //     shortUrlCreated: true,
                //     resMsg: `Short url created! Short Url: ${shortUrl}, QRCode: ${'was generated' || 'was not requested for'}, Long url: ${longUrl}.`
                // });
            // })
        } else {
            res.status(404).send({errMsg: `Please enter a valid long url.`});
        }
    } catch (err: unknown) {
        res.status(500).render('500-page');
        if (err instanceof Error) return console.error(err.message);
        console.error(err);
    }
}
async function getDashboard(req: Request, res: Response) {
    try {
        const urlCollection = await UrlModel.find();
        // console.log({urlCollection});
        res.status(200).render('dashboard', { urlCollection });
    } catch (err: unknown) {
        res.status(500).render('500-page');
        if (err instanceof Error) return console.log(err.message);
        console.log(err); 
    }
}
// update, deleteOne, deleteAll
async function getUrl() {}
async function getAllUrls() {}
async function updateUrl() {}
async function deleteUrl() {}
async function deleteAllUrls() {}

export { postNewShortUrl, getDashboard, };