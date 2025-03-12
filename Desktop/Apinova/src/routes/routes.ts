import { Router } from "express";
import express from "express";
import { AppDataSource } from "../data-source/data-source";
import { User } from "../Entity/entity";
import { UserServices } from "../service/service";
import { UserController } from "../controllers/controller";

export const routes = express.Router();
const userRepository = AppDataSource.getRepository(User);
const userService = new UserServices(userRepository);
const userController = new UserController(userService);

routes.post("/user", userController.userCreate.bind(userController));
routes.get("/user", userController.userGetAll.bind(userController));
routes.get("/user/:id", userController.userGetOne.bind(userController));
routes.delete("/user/:id", userController.deleteUser.bind(userController));
routes.put("/user/:id", userController.updateUSer.bind(userController));

export default routes;
