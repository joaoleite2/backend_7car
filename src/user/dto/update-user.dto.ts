import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  userName?:string;

  @IsOptional()
  @IsEmail()
  userEmail?:string;
  
  @IsOptional()
  @IsString()
  password?:string;
}
