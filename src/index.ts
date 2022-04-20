import { AppDataSource } from "./data-source"
// import { User } from "./entity/User"

import * as express from 'express';
import app from './app';


const port = process.env.PORT || 3000;


AppDataSource.initialize().then(async () => {
    console.log("Database connected");
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    })    
}).catch(error => console.log(error))