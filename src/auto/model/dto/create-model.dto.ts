import { IsNumber, IsString } from "class-validator";

export class CreateModelDto {
  @IsString()
  model:string;

  @IsNumber()
  idBrand:number
}