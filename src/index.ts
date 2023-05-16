import express, { Application, Request, Response } from 'express';
import { config } from 'dotenv';

config();

const app: Application = express();
const PORT: string | undefined = process.env.PORT;

app.get('/', ( req: Request, res: Response ): void => {
    console.log(`testing setup`);
    res.send(`hello, world`);
});

app.listen(PORT, (): void => {
    console.log(`App is attentively listening for incoming requests @ http://127.0.0.1:${PORT}`);
});