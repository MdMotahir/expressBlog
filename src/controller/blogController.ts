import { Blog } from "../entity/Blog";
import { User } from "../entity/User";
import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { AppDataSource } from '../data-source';


export const getAllBlogs = async (req: Request, res: Response) => {
    const entityManager = AppDataSource.getRepository(Blog);
    try {
        const blogs = await entityManager.find({
            relations: {
                user: true,
            }
        });
        return res.send(blogs);
    } catch (error) {
        return res.status(500).send(error);
    }
}

export const createBlog = async (req: Request, res: Response) => {
    const userEntityManager = AppDataSource.getRepository(User);
    const user = await userEntityManager.findOneBy({id:req.body.userId});
    if(!user){
        return res.status(500).send("User not found");
    }
    console.log(user);

    let blogData = {
        title: req.body.title,
        content: req.body.content,
        blogCreatedDate: req.body.blogCreatedDate,
        user: user
    }

    const entityManager = AppDataSource.getRepository(Blog);

    try {
        const blog = await entityManager.save(blogData).catch(error => {
            console.log(error);
        })
        return res.send(blog);
    } catch (error) {
        return res.status(500).send(error);
    }
}

export const getBlog = async (req: Request, res: Response) => {
    const entityManager = AppDataSource.getRepository(Blog);
    try {
        const blogs = await entityManager.findOne({
            where: {
                id:req.params.id
            },
            relations: {
                user: true,
            }
        });
        return res.send(blogs);
    } catch (error) {
        return res.status(500).send(error);
    }
}