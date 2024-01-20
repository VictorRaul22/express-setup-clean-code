import { type User } from "./User";
import { type UserEntity } from "./user.entity";

export interface UserRepository {
  list: () => Promise<UserEntity[] | []>;
  get: (uuid: string) => Promise<UserEntity | null>;
  getByEmail: (email: string) => Promise<UserEntity | null>;
  getByName: (name: string) => Promise<UserEntity | null>;
  create: (user: User) => Promise<void>;
}
