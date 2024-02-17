import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors';

import { LISTEN_PORT } from './config';

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('The server is working!');
});

app.listen(LISTEN_PORT, () => {
    console.log(`SPC Server running at ${LISTEN_PORT}...`);
});