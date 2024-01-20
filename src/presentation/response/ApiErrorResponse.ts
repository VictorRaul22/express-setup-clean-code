import { type IApiResponse } from "./ApiResponse";

export interface ApiErrorResponseType {
  data: null;
  error: { message: string };
}
export class ApiErrorResponse
  implements IApiResponse<ApiErrorResponseType>
{
  data: null;
  message: string;
  constructor(message: string) {
    this.data = null;
    this.message = message;
  }

  toJson() {
    return {
      data: null,
      error: {
        message: this.message,
      },
    };
  }
}
