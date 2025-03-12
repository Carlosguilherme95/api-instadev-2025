import { Request, Response } from "express";
import { User } from "../entity/entity";
import { AppDataSource } from "../data-source/data-source";
import { createUser } from "../model/users";

export class UserController {
  async userCreate(req: Request, res: Response) {
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
      res.status(201).send("usuário criado com sucesso");
    } catch (Error) {
      res
        .status(404)
        .send("não foi possível criar o usuário email ou usuário já utilizado");
    }
  }
  async userGetAll(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const getRepository = AppDataSource.getRepository(User);
      const getAll = await getRepository.find();
      res.status(200).json(getAll);
    } catch (Error) {
      res.status(404).send("nenhum usuário encontrado");
    }
  }
  async userGetOne(req: Request, res: Response) {
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
  async userDelete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const getRepository = AppDataSource.getRepository(User);
      const getToDelete = await getRepository.findOne({
        where: { id: Number(id) },
      });
      if (!getToDelete) {
        res.status(404).send("o usuário não foi localizado na base de dados");
      }
      await getRepository.delete(id);
      res.status(200).send("usuário deletado da base de dados");
    } catch (Error) {
      res.status(500).send("erro inesperado");
    }
  }
  async userModify(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const userRepository = AppDataSource.getRepository(User);
      const userModify = await userRepository.findOne({
        where: { id: Number(id) },
      });
      if (userModify) {
        userModify.name = req.body.name;
        userModify.user_name = req.body.user_name;
        userModify.email = req.body.email;
        userModify.avatar = req.body.avatar;
        userModify.bio = req.body.bio;
        userModify.gender = req.body.gender;
        userModify.password_hash = req.body.password_hash;
        await userRepository.save(userModify);
      }
      res.status(200).send("usuário modificado com sucesso!");
    } catch (Error) {
      res.status(404).send("não foi possível alterar o usuário");
    }
  }
}
