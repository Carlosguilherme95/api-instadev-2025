import { DataSource } from "typeorm";
import { createUser } from "../model/users";
import { Request, Response } from "express";

export async function userPost(req: Request, res: Response) {
  const { name, user_name, email, avatar, bio, gender, password_hash } =
    req.body;
  try {
    await createUser(
      name,
      user_name,
      email,
      avatar,
      bio,
      gender,
      password_hash
    );
    res.status(201).send("user created");
  } catch (Erorr) {
    res.send(404).send("erro");
  }
}
