import express, { Application } from 'express';
import { config } from 'dotenv';
import { mongodb } from './db/connect.db';
import { devRoute } from './routes/dev.route';
import { urlRoute } from './routes/url.route';
import { redirectRoute } from './routes/redirect.route';
import { userRoute } from './routes/user.route';
import { scissorRoute } from './routes/scissor.route';

config();
mongodb();

const app: Application = express();
const PORT: string | undefined = process.env.PORT;
const apiV1: string = '/api/v1';

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(`/scissor`, scissorRoute);
app.use(`${apiV1}`, urlRoute);
app.use(`${apiV1}/dev`, devRoute);  // for dev purpose only
app.use(`${apiV1}/user`, userRoute); 
app.use(redirectRoute);

app.listen(PORT, (): void => {
    console.log(`Server is attentively listening for incoming requests @ http://127.0.0.1:${PORT}`);
});