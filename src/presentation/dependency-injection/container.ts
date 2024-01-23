import { Container } from "inversify";
import { TYPE } from "@/constants";
import { type UserRepository } from "@/modules/Users/domain/user.repository";
import { TypeOrmUserRepository } from "@/modules/Users/infrastructure/persistence/TypeOrmUserRepository";
import { CreateUserUseCase } from "@/modules/Users/application/Create/CreateUserUseCase";
import { SearchAllUseCase } from "@/modules/Users/application/SearchAll/SearchAllUseCase";
import { SearchUserByIdUseCase } from "@/modules/Users/application/SearchBy/SearchById";
import { type Logger } from "@/modules/Shared/domain/Logger";
import { WinstonLogger } from "@/modules/Shared/infrastructure/WinstonLogger";

const container = new Container({});
container.bind<Logger>(TYPE.Logger).to(WinstonLogger);

container
  .bind<UserRepository>(TYPE.UserRepository)
  .to(TypeOrmUserRepository);

container
  .bind<CreateUserUseCase>(TYPE.CreateUserUseCase)
  .to(CreateUserUseCase);
container
  .bind<SearchAllUseCase>(TYPE.SearchAllUseCase)
  .to(SearchAllUseCase);

container
  .bind<SearchUserByIdUseCase>(TYPE.SearchUserByIdUseCase)
  .to(SearchUserByIdUseCase);

export { container };
