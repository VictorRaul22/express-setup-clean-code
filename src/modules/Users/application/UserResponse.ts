import { Mapper } from "@/modules/Shared/domain/Mapper";
import { type User } from "../domain/User";

export interface UserResponse {
  uuid: string;
  email: string;
  name: string;
}
export class UserMapper extends Mapper<User, UserResponse> {
  map = ({ email, id, name }: User): UserResponse => {
    return { email, name, uuid: id };
  };
}
