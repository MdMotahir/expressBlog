import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User";
import { Blog } from "./entity/Blog";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "0.0.0.0",
    port: 3306,
    username: "root",
    password: "",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [User, Blog],
    migrations: [],
    subscribers: [],
})
