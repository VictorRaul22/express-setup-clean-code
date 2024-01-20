export class AppException extends Error {
  public readonly statusCode: number;
  constructor({
    statusCode,
    message,
  }: {
    statusCode: number;
    message: string;
  }) {
    super(message);
    this.name = "AppException";
    this.statusCode = statusCode;
  }
}
