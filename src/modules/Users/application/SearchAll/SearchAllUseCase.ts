import { Result } from "@/modules/Shared/domain/Result";
import { UserMapper, type UserResponse } from "../UserResponse";
import { type UseCase } from "@/modules/Shared/domain/UseCase";
import { inject, injectable } from "inversify";
import { TYPE } from "@/constants";
import { UserRepository } from "../../domain/user.repository";
import { right, type Either, left } from "@/modules/Shared/domain/Either";
import { AppError } from "@/modules/Shared/domain/AppError";

type Response = Either<AppError.UnexpectedError, Result<UserResponse[]>>;
@injectable()
export class SearchAllUseCase
  implements UseCase<undefined, Promise<Response>>
{
  constructor(
    @inject(TYPE.UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  execute = async (): Promise<Response> => {
    try {
      const users = await this.userRepository.list();
      const userMapper = new UserMapper();
      const resultMapper = userMapper.fromArray(users);
      return right(Result.ok(resultMapper));
    } catch (err) {
      return left(AppError.UnexpectedError.create(err));
    }
  };
}
