import express, { Request, Response } from "express";
import { userGetAll, userGetOne, userPost } from "../controllers/controller";

export const routes = express.Router();

routes.post("/user", userPost);
routes.get("/user", userGetAll);
routes.get("/user/:id", userGetOne);

export default routes;
