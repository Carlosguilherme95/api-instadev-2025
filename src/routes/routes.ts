import express, { Request, Response } from "express";
import { userPost } from "../controllers/controller";
const app = express();
export const routes = express.Router();

routes.post("/user", userPost);

export default routes;
