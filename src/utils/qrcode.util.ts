import { unlink } from 'fs';
import { toFile } from 'qrcode';

async function qrGenerator(filePath: string, data: string): Promise<unknown> {
    try { 
        return await toFile(filePath, data);
    } catch (err) {
        if (err instanceof Error) return console.log(err.message);
        console.log(err);
    }
}
function qrcodeResMsg(qrcodeRequested: boolean): string {
    if (qrcodeRequested) return 'QRCode was generated';
    return 'QRCode was not requested for';
}
async function deleteQrcodeImage(imagePath: any) {
    await unlink(imagePath, (err) => {
        if (err) throw err;
        console.log(`QRCode image was deleted`);
    });
}

export { qrGenerator, qrcodeResMsg };