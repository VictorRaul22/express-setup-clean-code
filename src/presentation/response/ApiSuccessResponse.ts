import { type IApiResponse } from "./ApiResponse";

export interface ApiSuccessResponseType<T> {
  data: T | null;
  error: null;
}

export class ApiSuccessResponse<T>
  implements IApiResponse<ApiSuccessResponseType<T>>
{
  data: T;
  message: null;
  constructor(data: T) {
    this.data = data;
    this.message = null;
  }

  toJson() {
    return {
      data: this.data,
      error: null,
    };
  }
}
