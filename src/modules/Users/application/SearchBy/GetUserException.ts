import { type DomainError } from "@/modules/Shared/domain/DomainError";
import { Result } from "@/modules/Shared/domain/Result";

export namespace GetUserException {
  export class UserNotFoundById extends Result<DomainError> {
    constructor(id: string) {
      super(false, {
        message: `User Not Found by id: ${id}`,
      });
    }

    public static create(id: string): UserNotFoundById {
      return new UserNotFoundById(id);
    }
  }
}
