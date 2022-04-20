import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { AppDataSource } from './data-source';
import router from './routers';


const app = express();
app.use(bodyParser.json());

dotenv.config();


app.use('/',router);


export default app;