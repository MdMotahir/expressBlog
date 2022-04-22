import { Blog } from "../entity/Blog";
import { User } from "../entity/User";
import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { AppDataSource } from '../data-source';
import { body, validationResult } from 'express-validator';

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

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userEntityManager = AppDataSource.getRepository(User);
    const user = await userEntityManager.findOneBy({ id: req.body.userId });
    if (!user) {
        return res.status(404).send("User not found, Please create user first");
    }
    console.log(user);

    let blogData = {
        title: req.body.title,
        content: req.body.content,
        blogCreatedDate: req.body.blogCreatedDate,
        user: user
    }

    const entityManager = AppDataSource.getRepository(Blog);

    let data = await entityManager.findOneBy({ title: req.body.title });
    if (data) {
        return res.status(500).send("Blog already exists");
    }

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
                id: req.params.id as any
            },
            relations: {
                user: true,
            }
        });
        if (!blogs) {
            return res.status(404).send("Blog not found");
        }
        return res.send(blogs);
    } catch (error) {
        return res.status(500).send(error);
    }
}


export const updateBlog = async (req: Request, res: Response) => {

    const entityManager = AppDataSource.getRepository(Blog);
    let blog = await entityManager.findOne({
        where: {
            id: req.params.id as any
        },
        relations: {
            user: true,
        }
    });
    if (!blog) {
        return res.status(404).send("Blog not found");
    }

    const userEntityManager = AppDataSource.getRepository(User);
    const user = await userEntityManager.findOneBy({ id: req.body.userId });

    if (!user) {
        return res.status(404).send("User not found, Please create user first");
    }

    blog.title = req.body.title ? req.body.title : blog.title;
    blog.content = req.body.content ? req.body.content : blog.content;
    blog.blogCreatedDate = req.body.blogCreatedDate ? req.body.blogCreatedDate : blog.blogCreatedDate;

    try {
        const updatedBlog = await entityManager.save(blog);
        return res.send(updatedBlog);
    } catch (error) {
        return res.status(500).send(error);
    }

}

export const deleteBlog = async (req: Request, res: Response) => {
    const entityManager = AppDataSource.getRepository(Blog);
    try {
        const blog = await entityManager.findOne({
            where: {
                id: req.params.id as any
            },
            relations: {
                user: true,
            }
        });
        if (!blog) {
            return res.status(404).send("Blog not found");
        }
        await entityManager.remove(blog);
        return res.send("Blog deleted successfully");
    } catch (error) {
        return res.status(500).send(error);
    }
}