import { toDataURL, toFile } from 'qrcode';

// async function qrGenerator(data: string) {
//     try { 
//         return await toDataURL(data);
//     } catch (err) {
//         if (err instanceof Error) return console.log(err.message);
//         console.log(err);
//     }
// }

async function qrGenerator(filePath: string, data: string): Promise<unknown> {
    try { 
        return await toFile(filePath, data);
    } catch (err) {
        if (err instanceof Error) return console.log(err.message);
        console.log(err);
    }
}

export { qrGenerator };