import { User } from "../Entity/entity";
import { Repository } from "typeorm";

export class UserServices {
  private userRepository: Repository<User>;

  constructor(userRepository: Repository<User>) {
    this.userRepository = userRepository;
  }

  async userCreate(
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

    await this.userRepository.save(newUser);
  }
  async userGetAll() {
    return await this.userRepository.find();
  }
  async userGetOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    console.log(user);
    return user;
  }
  async deleteUser(id: string) {
    const user = await this.userRepository.delete(id);
    console.log(user);
    return user;
  }
  async modifyUser(id: string, upadateUserData: any) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new Error("usuário não encontrado");
    }
    user.name = upadateUserData.name;
    user.user_name = upadateUserData.user_name;
    user.email = upadateUserData.email;
    user.avatar = upadateUserData.avatar;
    user.bio = upadateUserData.bio;
    user.gender = upadateUserData.gender;
    user.password_hash = upadateUserData.password_hash;

    await this.userRepository.save(user);
    console.log(user);
    return user;
  }
}
