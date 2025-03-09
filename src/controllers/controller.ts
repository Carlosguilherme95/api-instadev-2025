import { DataSource } from "typeorm";
import { createUser } from "../model/users";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source/database-conection";
import { User } from "../entity/entity";

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
export async function userGetAll(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const getRepository = AppDataSource.getRepository(User);
    const getAll = await getRepository.find();
    res.status(200).json(getAll);
  } catch (Error) {
    res.status(404).send("nenhum usuário encontrado");
  }
}
export async function userGetOne(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const getrepository = AppDataSource.getRepository(User);
    const getOne = await getrepository.findOne({
      where: { id: Number(id) },
    });
    if (!getOne) {
      res.status(404).send("usuário não foi encontrado");
    }
    res.status(200).json(getOne);
  } catch (Error) {
    res.status(500).send("erro de comunicação");
  }
}
