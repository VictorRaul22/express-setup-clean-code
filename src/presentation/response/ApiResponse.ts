export interface IApiResponse<T> {
  data: any;
  message: string | null;
  toJson: () => T;
}
