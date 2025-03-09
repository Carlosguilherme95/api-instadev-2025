import express, { Request, Response } from "express";
import { UserController } from "../controllers/controller";

export const routes = express.Router();
const userControllers = new UserController();

routes.post("/user", userControllers.userCreate);
routes.get("/user", userControllers.userGetAll);
routes.get("/user/:id", userControllers.userGetOne);
routes.delete("/user/:id", userControllers.userDelete);
routes.put("/user/:id", userControllers.userModify);

export default routes;
