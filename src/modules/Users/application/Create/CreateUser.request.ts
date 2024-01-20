import {
  Length,
  IsEmail,
  IsStrongPassword,
  MaxLength,
} from "class-validator";

export class CreateUserRequest {
  @Length(1, 150)
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minSymbols: 0,
  })
  @MaxLength(250)
  password: string;
}
