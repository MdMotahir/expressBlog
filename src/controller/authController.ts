import { Request, Response, NextFunction } from "express";
import { AppDataSource } from '../data-source';
import { User } from "../entity/User";
import axios from "axios";
import * as jwt from 'express-jwt';
import * as jwks from 'jwks-rsa';
import { validationResult } from 'express-validator';


const generateAoth0Token = async () => {

    let url: string = 'https://dev-vvpop4j1.us.auth0.com/oauth/token'

    let headers=  { 
        'content-type': 'application/json'
    }

    let body = {
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: process.env.AUTH0_AUDIENCE,
        grant_type: process.env.AUTH0_GRANT_TYPE
    }
    return await axios.post(url, body, { headers: headers }).then(res => {
        return res.data.access_token;
    }).catch(error => {
        console.log(error);
    })
}


export const verifyAuth = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-vvpop4j1.us.auth0.com/.well-known/jwks.json'
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: 'https://dev-vvpop4j1.us.auth0.com/',
  algorithms: ['RS256']
});

export const login = async (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    const entityManager = AppDataSource.getRepository(User);
    try {
        const user = await entityManager.findOneBy({ email: req.body.email, password: req.body.password });
        if (!user) {
            return res.status(404).send("User not found");
        }
        const token = await generateAoth0Token();
        return res.send({
            success: true,
            token: token
        });
    } catch (error) {
        return res.status(500).send(error);
    }
}