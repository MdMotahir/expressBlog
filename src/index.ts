import { AppDataSource } from "./data-source"
// import { User } from "./entity/User"

import * as express from 'express';
import app from './app';


const port = process.env.PORT || 3000;


AppDataSource.initialize().then(async () => {
    console.log("Here you can setup and run express / fastify / any other framework.")
}).catch(error => console.log(error))


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})








