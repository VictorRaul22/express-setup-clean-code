import { type UserEntity } from "./user.entity";
import { randomUuid } from "@/modules/Shared/domain/uuid";
export class User implements UserEntity {
  readonly id: string;
  constructor(
    readonly name: string,
    readonly email: string,
    readonly password: string
  ) {
    this.id = randomUuid();
  }
}
