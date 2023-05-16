import express from 'express';
import { config } from 'dotenv';

config();

const app = express();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
    console.log(`testing setup`);
    res.send(`hello, world`);
});

app.listen(PORT, () => {
    console.log(`App is attentively listening for incoming requests @ http://127.0.0.1:${PORT}`);
});