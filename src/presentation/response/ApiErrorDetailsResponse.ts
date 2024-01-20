import { ApiErrorResponse } from "./ApiErrorResponse";
import { type IApiResponse } from "./ApiResponse";

export interface ApiErrorDetailResponseType {
  data: null;
  error: {
    message: string;
    details: Record<string, { message: string; value?: string }>;
  };
}
export class ApiErrorDetailResponse
  extends ApiErrorResponse
  implements IApiResponse<ApiErrorDetailResponseType>
{
  details: Record<string, { message: string; value?: string }>;
  constructor(
    message: string,
    details: Record<string, { message: string; value?: string }>
  ) {
    super(message);
    this.details = details;
  }

  toJson() {
    return {
      data: null,
      error: {
        details: this.details,
        message: this.message,
      },
    };
  }
}
