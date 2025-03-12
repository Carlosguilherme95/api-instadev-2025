import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import * as bcrypt from "bcryptjs";

@Entity()
@Unique(["user_name", "email"])
export class User {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false })
  user_name!: string;

  @Column({ nullable: false })
  email!: string;

  @Column()
  avatar!: string;

  @Column()
  bio!: string;

  @Column()
  gender!: string;

  @Column({ nullable: false })
  password_hash!: string;
  @BeforeInsert()
  async hashPassword() {
    if (this.password_hash) {
      //Gera o hash da senha com 10 rounds de salt
      this.password_hash = await bcrypt.hash(this.password_hash, 10);
    }
  }

  @CreateDateColumn()
  created_at!: Date;

  @CreateDateColumn()
  updated_at!: Date;
}
