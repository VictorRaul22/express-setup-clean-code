import { injectable } from "inversify";
import { type User } from "../../domain/User";
import { type UserEntity } from "../../domain/user.entity";
import { type UserRepository } from "../../domain/user.repository";

@injectable()
export class TypeOrmUserRepository implements UserRepository {
  getByEmail = async (_email: string): Promise<UserEntity | null> => {
    return {
      id: "1234fs",
      email: "victor",
      name: "victor",
      password: "123",
    };
  };

  getByName = async (_username: string): Promise<UserEntity | null> => {
    return {
      id: "1234fs",
      email: "victor",
      name: "victor",
      password: "123",
    };
  };

  list = async (): Promise<UserEntity[]> => {
    return [
      {
        id: "1234fs",
        email: "victor",
        name: "victor",
        password: "123",
      },
    ];
  };

  get = async (_uuid: string): Promise<UserEntity | null> => {
    return {
      id: "1234fs",
      email: "victor",
      name: "victor",
      password: "123",
    };
  };

  create = async (_user: User): Promise<void> => {};
}
