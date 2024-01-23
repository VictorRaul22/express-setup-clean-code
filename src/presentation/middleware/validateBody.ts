import { validate } from "@/modules/Shared/application/validate";
import { ValidateException } from "@/modules/Shared/domain/ValidateException";
import { type ClassConstructor } from "class-transformer";
import {
  type RequestHandler,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { RequestValidateException } from "../error/RequestValidateException";

export function validateBody<T extends object>(
  targetClass: ClassConstructor<T>
): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      validate(targetClass, req.body);
      next();
    } catch (error) {
      if (error instanceof ValidateException) {
        next(new RequestValidateException(error.fields));
        return;
      }
      next(error);
    }
  };
}
