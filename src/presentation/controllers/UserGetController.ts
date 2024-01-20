import { TYPE } from "@/constants";
import {
  controller,
  httpGet,
  request,
  response,
} from "inversify-express-utils";
import { SearchAllUseCase } from "@/modules/Users/application/SearchAll/SearchAllUseCase";
import { inject } from "inversify";
import { BaseController } from "../lib/BaseController";
import { SearchUserByIdUseCase } from "@/modules/Users/application/SearchBy/SearchById";
import { Request } from "express";
import { validateParams } from "../middleware/validateParams";
import { GetUserRequest } from "@/modules/Users/application/SearchBy/GetUser.request";
import { GetUserException } from "@/modules/Users/application/SearchBy/GetUserException";

@controller("/user")
export class UserGetController extends BaseController {
  constructor(
    @inject(TYPE.SearchAllUseCase)
    private readonly searchAllUseCase: SearchAllUseCase,
    @inject(TYPE.SearchUserByIdUseCase)
    private readonly searchUserByIdUseCase: SearchUserByIdUseCase
  ) {
    super();
  }

  @httpGet("/")
  public async list() {
    const result = await this.searchAllUseCase.execute();
    if (result.isLeft()) {
      const error = result.value;
      return this.fail(error.getValue().message);
    } else {
      // console.log("controller");
      return this.ok(result.value.getValue());
    }
  }

  @httpGet("/:id", validateParams(GetUserRequest))
  public async getById(
    @request() req: Request,
    @response() _res: Response
  ) {
    const result = await this.searchUserByIdUseCase.execute(
      req.params as unknown as GetUserRequest
    );
    if (result.isLeft()) {
      const error = result.value;
      if (error instanceof GetUserException.UserNotFoundById) {
        return this.notFound(error.getValue().message);
      } else {
        return this.fail(error);
      }
    } else {
      return this.ok(result.value.getValue());
    }
  }
}
