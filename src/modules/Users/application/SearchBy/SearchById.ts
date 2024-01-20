import { AppError } from "@/modules/Shared/domain/AppError";
import { left, type Either, right } from "@/modules/Shared/domain/Either";
import { Result } from "@/modules/Shared/domain/Result";
import { UserMapper, type UserResponse } from "../UserResponse";
import { type UseCase } from "@/modules/Shared/domain/UseCase";
import { type GetUserRequest } from "./GetUser.request";
import { inject, injectable } from "inversify";
import { TYPE } from "@/constants";
import { UserRepository } from "../../domain/user.repository";
import { GetUserException } from "./GetUserException";

type Response = Either<
  GetUserException.UserNotFoundById,
  Result<UserResponse>
>;
@injectable()
export class SearchUserByIdUseCase
  implements UseCase<GetUserRequest, Promise<Response>>
{
  constructor(
    @inject(TYPE.UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  execute = async (request: GetUserRequest): Promise<Response> => {
    const { id } = request;
    try {
      const user = await this.userRepository.get(id);
      if (user == null)
        return left(GetUserException.UserNotFoundById.create(id));
      const userMapper = new UserMapper();
      const resultMapper = userMapper.from(user);
      return right(Result.ok(resultMapper));
    } catch (err) {
      return left(AppError.UnexpectedError.create(err));
    }
  };
}
