import { inject } from "inversify";
import { BaseController } from "../lib/BaseController";
import {
  controller,
  httpPost,
  request,
  response,
} from "inversify-express-utils";
import { TYPE } from "@/constants";
import { CreateUserUseCase } from "@/modules/Users/application/Create/CreateUserUseCase";
import { validateBody } from "../middleware/validateBody";
import { CreateUserRequest } from "@/modules/Users/application/Create/CreateUser.request";
import { Response, Request } from "express";

@controller("/user")
export class UserPostController extends BaseController {
  constructor(
    @inject(TYPE.CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase
  ) {
    super();
  }

  @httpPost("/", validateBody(CreateUserRequest))
  public async post(@request() req: Request, @response() _res: Response) {
    const { email, name, password } = req.body as CreateUserRequest;

    const user = await this.createUserUseCase.execute({
      email,
      name,
      password,
    });
    return this.json(user, 200);
  }
}
