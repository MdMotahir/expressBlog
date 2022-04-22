import { User } from "../entity/User";
import { Blog } from "../entity/Blog";
import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { AppDataSource } from '../data-source';
import { body, validationResult } from 'express-validator';

export const getAllUser = async (req: Request, res: Response) => {

    const entityManager = AppDataSource.getRepository(User);
    try {
        const users = await entityManager.find({
            relations: {
                blogs: true,
            }
        });
        return res.send(users);
    } catch (error) {
        return res.status(500).send(error);
    }

}

export const getUser = async (req: Request, res: Response) => {
    const entityManager = AppDataSource.getRepository(User);
    try {
        const user = await entityManager.findOne({
            where: {
                id: req.params.id as any
            },
            relations: {
                blogs: true,
            }
        });
        if (!user) {
            return res.status(404).send("User not found");
        }
        return res.send(user);
    } catch (error) {
        return res.status(500).send(error);
    }
}

export const createUser = async (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const entityManager = AppDataSource.getRepository(User);
    let userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password
    }
    try {

        let data = await entityManager.findOneBy({ email: userData.email });
        if (data) {
            return res.status(500).send("User already exists");
        }
        const user = await entityManager.save(userData);
        return res.send(user);
    } catch (error) {
        return res.status(500).send(error);
    }
}


export const updateUser = async (req: Request, res: Response) => {
    const entityManager = AppDataSource.getRepository(User);

    try {
        const user = await entityManager.findOneBy({ id: req.params.id as any });
        if (!user) {
            return res.status(500).send("User not found");
        }
        //find user by email
        let data = await entityManager.findOneBy({ email: req.body.email });
        if (data) {
            return res.status(500).send("Email already exists");
        }
        user.firstName = req.body.firstName ? req.body.firstName : user.firstName;
        user.lastName = req.body.lastName ? req.body.lastName : user.lastName;
        user.age = req.body.age ? req.body.age : user.age;
        user.email = req.body.email ? req.body.email : user.email;
        user.password = req.body.password ? req.body.password : user.password;
        const updatedUser = await entityManager.save(user);
        return res.send(updatedUser);
    } catch (error) {
        return res.status(500).send(error);
    }

}

export const deleteUser = async (req: Request, res: Response) => {
    const entityManager = AppDataSource.getRepository(User);
    try {
        const user = await entityManager.findOne({
            where: { id: req.params.id as any }
        });
        if (!user) {
            return res.status(500).send("User not found");
        }
        await entityManager.softRemove(user);
        return res.send("User deleted successfully");
    } catch (error) {
        return res.status(500).send(error);
    }
}