import { IsString } from "class-validator";

export class UpdateModelDTO{
  @IsString()
  model:string;
}