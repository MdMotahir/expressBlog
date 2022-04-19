import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from "typeorm";
import { User } from "./User";


@Entity()
export class Blog {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    blogCreatedDate: String;

    @ManyToOne(() => User, (user) => user.blogs)
    user: User;
}