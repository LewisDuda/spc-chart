import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors';

import { LISTEN_PORT } from './config';
import Routes from './Routes'

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

Routes(app)

app.listen(LISTEN_PORT, () => {
    console.log(`SPC Server running at ${LISTEN_PORT}...`);
});