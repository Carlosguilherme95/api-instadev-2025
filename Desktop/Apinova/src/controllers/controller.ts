import { UserServices } from "../service/service";
import { Request, Response } from "express";

export class UserController {
  constructor(private readonly userService: UserServices) {}

  async userCreate(req: Request, res: Response) {
    const { name, user_name, email, avatar, bio, gender, password_hash } =
      req.body;
    try {
      await this.userService.userCreate(
        name,
        user_name,
        email,
        avatar,
        bio,
        gender,
        password_hash
      );

      res.status(201).send("usuário criado com sucesso");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erro:", error.message);
      } else {
        console.error("Erro desconhecido");
      }
    }
  }
  async userGetAll(req: Request, res: Response) {
    try {
      const getAllUsers = await this.userService.userGetAll();
      res.status(200).json(getAllUsers);
    } catch (error) {
      res.status(400).send("erro ao buscar usuários");
    }
  }
  async userGetOne(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const getOneUSer = await this.userService.userGetOne(id);
      res.status(200).json(getOneUSer);
    } catch (Error) {
      res.status(400).send("não foi possível buscar esse usuário");
    }
  }
  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deleteUser = await this.userService.deleteUser(id);
      if (!id) {
        res.status(400).send("id não encontrado");
      }
      res.status(200).send("usuário deletado com sucesso");
    } catch (Error) {
      res.status(500).send("erro inesperado");
    }
  }
  async updateUSer(req: Request, res: Response) {
    const { id } = req.params;
    const updateUserData = req.body;
    try {
      const updatedUser = await this.userService.modifyUser(id, updateUserData);
      res.status(200).json(updatedUser);
    } catch (Error) {
      res.status(400).send("não foi possível modificar o usuário");
    }
  }
}
