import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  userName:string;

  @IsEmail()
  userEmail:string;

  @IsString()
  password:string;
}
