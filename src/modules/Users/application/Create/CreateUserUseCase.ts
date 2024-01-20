import { right, type Either, left } from "@/modules/Shared/domain/Either";
import { type UseCase } from "@/modules/Shared/domain/UseCase";
import { CreateUserException } from "./CreateUserException";
import { Result } from "@/modules/Shared/domain/Result";
import { type CreateUserRequest } from "./CreateUser.request";
import { User } from "../../domain/User";
import { AppError } from "@/modules/Shared/domain/AppError";
import { inject, injectable } from "inversify";
import { TYPE } from "@/constants";
import { UserRepository } from "../../domain/user.repository";

type Response = Either<
  | CreateUserException.AccountAlreadyExistsException
  | CreateUserException.UsernameTakenError,
  Result<void>
>;

@injectable()
export class CreateUserUseCase
  implements UseCase<CreateUserRequest, Promise<Response>>
{
  constructor(
    @inject(TYPE.UserRepository)
    protected readonly userRepository: UserRepository
  ) {}

  execute = async (request: CreateUserRequest): Promise<Response> => {
    const user = new User(request.name, request.email, request.password);
    try {
      const [userByName, userByEmail] = await Promise.all([
        this.userRepository.getByName(user.name),
        this.userRepository.getByEmail(user.email),
      ]);
      const usernameTaken = userByName != null;
      const accountCreated = userByEmail != null;
      if (usernameTaken)
        return left(
          CreateUserException.UsernameTakenError.create(user.name)
        );
      if (accountCreated)
        return left(
          CreateUserException.AccountAlreadyExistsException.create()
        );

      await this.userRepository.create(user);
      return right(Result.ok());
    } catch (err) {
      return left(AppError.UnexpectedError.create(err));
    }
  };
}
