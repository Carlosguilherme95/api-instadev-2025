import { DataSource } from "typeorm";
import { User } from "../entity/entity";
import { AppDataSource } from "../data-source/database-conection";

export async function createUser(
  name: string,
  user_name: string,
  email: string,
  avatar: string,
  bio: string,
  gender: string,
  password_hash: string
) {
  const newUser = new User();
  newUser.name = name;
  newUser.user_name = user_name;
  newUser.email = email;
  newUser.avatar = avatar;
  newUser.bio = bio;
  newUser.gender = gender;
  newUser.password_hash = password_hash;

  const dataSource = AppDataSource.getRepository(User);
  await dataSource.save(newUser);
}
