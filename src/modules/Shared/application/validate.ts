import { ValidateException } from "@/modules/Shared/domain/ValidateException";
import { type ClassConstructor, plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";

export function validate<T extends object>(
  targetClass: ClassConstructor<T>,
  plain: any
) {
  const instance = plainToInstance(targetClass, plain);
  const errors = validateSync(instance, {
    forbidUnknownValues: true,
    validationError: {
      target: false,
    },
  });
  const fieldsErrors: Record<string, { message: string; value: string }> =
    {};

  if (errors.length > 0) {
    errors.forEach((error) => {
      if (error.constraints != null) {
        fieldsErrors[error.property] = {
          message: Object.values(error.constraints).join(", "),
          value: error.value,
        };
      }
      if (error.children != null) {
        error.children.forEach((errorNested) => {
          if (errorNested.constraints != null) {
            fieldsErrors[errorNested.property] = {
              message: Object.values(errorNested.constraints).join(", "),
              value: errorNested.value,
            };
          }
        });
      }
    });

    throw new ValidateException(fieldsErrors, "Validation failed");
  }
  return true;
}
