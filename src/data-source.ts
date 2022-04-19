import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User";
import { Blog } from "./entity/Blog";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "0.0.0.0",
    port: 3306,
    username: "root",
    password: "root",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [User, Blog],
    migrations: [],
    subscribers: [],
})


// AppDataSource.initialize().then(async () => {

    // console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.firstName = "Timber"
    // user.lastName = "Saw"
    // user.age = 25
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)

//     console.log("Here you can setup and run express / fastify / any other framework.")

// }).catch(error => console.log(error))
