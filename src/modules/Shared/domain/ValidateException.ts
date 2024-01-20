export type FieldErrors = Record<
  string,
  {
    message: string;
    value?: any;
  }
>;
export class ValidateException extends Error {
  constructor(
    public fields: FieldErrors,
    message: string = "Validation failed"
  ) {
    super(message);
    this.name = "Validate Exception";
  }
}
