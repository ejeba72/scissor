import express, { Application } from 'express';
import { config } from 'dotenv';
import { devRoute } from './routes/dev.route';

config();

const app: Application = express();
const PORT: string | undefined = process.env.PORT;
const apiV1: string = '/api/v1/';

app.use(express.json());
app.use('/dev', devRoute);  // for dev purpose only

app.listen(PORT, (): void => {
    console.log(`App is attentively listening for incoming requests @ http://127.0.0.1:${PORT}`);
});