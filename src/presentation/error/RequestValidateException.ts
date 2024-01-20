import { AppException } from "./AppException";
import httpStatus from "http-status";

export class RequestValidateException extends AppException {
  public readonly details: Record<
    string,
    { message: string; value?: string }
  >;

  constructor(
    details: Record<string, { message: string; value?: string }>
  ) {
    super({
      statusCode: httpStatus.BAD_REQUEST,
      message: "Request Validation failed",
    });
    this.details = details;
    this.name = "ValidateRequestException";
  }
}
