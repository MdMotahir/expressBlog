import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Blog } from "./Blog";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @Column()
    email: string

    @Column({select: false})
    password: string

    @OneToMany(() => Blog, (blog) => blog.user, {
        cascade: true
    })
    blogs: Blog[];

}
