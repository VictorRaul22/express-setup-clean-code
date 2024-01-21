import { BaseHttpController } from "inversify-express-utils";
import httpStatus from "http-status";
import {
  ConflictResult,
  CreatedNegotiatedContentResult,
  OkNegotiatedContentResult,
  OkResult,
  type JsonResult,
} from "inversify-express-utils/lib/results";
import { type ApiErrorResponseType } from "../response/ApiErrorResponse";
import { type ApiSuccessResponseType } from "../response/ApiSuccessResponse";
import { type ApiErrorDetailResponseType } from "../response/ApiErrorDetailsResponse";
import { type URL } from "url";

type ApiRes<T> =
  | ApiSuccessResponseType<T>
  | ApiErrorResponseType
  | ApiErrorDetailResponseType;

export class BaseController extends BaseHttpController {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor

  protected jsonResponse<T>(code: number, res: ApiRes<T>): JsonResult {
    return this.json(res, code);
  }

  protected ok<T>(content: T): OkNegotiatedContentResult<T>;
  protected ok(): OkResult;
  protected ok<T>(content?: T): OkResult {
    return content === undefined
      ? new OkResult()
      : new OkNegotiatedContentResult({
          data: content,
          error: null,
        });
  }

  protected override created<
    T = ApiErrorDetailResponseType | ApiErrorResponseType,
  >(
    location: string | URL,
    content?: T
  ): CreatedNegotiatedContentResult<T> {
    if (content === undefined) {
      return new CreatedNegotiatedContentResult(location, content);
    }
    return new CreatedNegotiatedContentResult(location, {
      data: content,
      error: null,
    });
  }

  protected clientError(
    message?: string,
    details?: Record<string, { message: string; value: string }>
  ) {
    return this.jsonResponse(httpStatus.BAD_REQUEST, {
      data: null,
      error: {
        message: message ?? "Unauthorized",
        details,
      },
    });
  }

  protected unauthorized(message?: string) {
    return this.jsonResponse(httpStatus.UNAUTHORIZED, {
      data: null,
      error: {
        message: message ?? "Unauthorized",
      },
    });
  }

  protected paymentRequired(message?: string) {
    return this.jsonResponse(httpStatus.PAYMENT_REQUIRED, {
      data: null,
      error: {
        message: message ?? "Payment required",
      },
    });
  }

  protected forbidden(message?: string) {
    return this.jsonResponse(httpStatus.FORBIDDEN, {
      data: null,
      error: {
        message: message ?? "Forbidden",
      },
    });
  }

  protected override notFound(message?: string) {
    return this.jsonResponse(httpStatus.NOT_FOUND, {
      data: null,
      error: {
        message: message ?? "NotFound",
      },
    });
  }

  public tooMany(message?: string) {
    return this.jsonResponse(httpStatus.TOO_MANY_REQUESTS, {
      data: null,
      error: {
        message: message ?? "Too many requests",
      },
    });
  }

  protected conflict(message?: string) {
    return message === undefined
      ? new ConflictResult()
      : this.jsonResponse(httpStatus.CONFLICT, {
          data: null,
          error: {
            message,
          },
        });
  }

  protected fail(error: Error | string) {
    return this.jsonResponse(httpStatus.INTERNAL_SERVER_ERROR, {
      data: null,
      error: {
        message: error.toString(),
      },
    });
  }
}
