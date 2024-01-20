import { IsUUID } from "class-validator";
export class GetUserRequest {
  @IsUUID(4)
  id: string;
}
