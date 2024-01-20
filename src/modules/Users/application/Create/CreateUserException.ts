import { type DomainError } from "@/modules/Shared/domain/DomainError";
import { Result } from "@/modules/Shared/domain/Result";

/**
 * CreateUserException
 * @namespace
 * @desc CreateUser Exceptions
 */
export namespace CreateUserException {
  export class UsernameTakenError extends Result<DomainError> {
    constructor(username: string) {
      super(false, {
        message: `The username "${username}" has already been taken`,
      });
    }

    public static create(username: string): UsernameTakenError {
      return new UsernameTakenError(username);
    }
  }
  export class AccountAlreadyExistsException extends Result<DomainError> {
    constructor() {
      super(false, {
        message: `The account associated with this email already exists.`,
      });
    }

    public static create(): AccountAlreadyExistsException {
      return new AccountAlreadyExistsException();
    }
  }
}
