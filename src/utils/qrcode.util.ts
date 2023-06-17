import { toDataURL } from 'qrcode';

async function qrGenerator(data: string) {
    try { 
        return await toDataURL(data);
    } catch (err) {
        if (err instanceof Error) return console.log(err.message);
        console.log(err);
    }
}

export { qrGenerator };