import { type NextFunction, type Request, type Response } from "express";
import { RequestValidateException } from "../error/RequestValidateException";
import { ApiErrorDetailResponse } from "../response/ApiErrorDetailsResponse";
import { AppException } from "../error/AppException";
import { ApiErrorResponse } from "../response/ApiErrorResponse";
import httpStatus from "http-status";
import { TYPE } from "@/constants";
import { container } from "../dependency-injection/container";
import { type Logger } from "@/modules/Shared/domain/Logger";

export const error = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const Logger: Logger = container.get(TYPE.Logger);
  if (err instanceof RequestValidateException) {
    const data = new ApiErrorDetailResponse(err.message, err.details);
    return res.status(err.statusCode).json(data.toJson());
  }
  if (err instanceof AppException) {
    const data = new ApiErrorResponse(err.message);
    Logger.error(data.message);
    return res.status(err.statusCode).json(data.toJson());
  }
  const data = new ApiErrorResponse("Internal Server Error");

  Logger.error(err);
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(data.toJson());
};
