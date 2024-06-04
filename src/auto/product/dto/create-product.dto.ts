import { IsNumber, IsString, IsUrl } from "class-validator";

export class CreateProductDto {
  @IsNumber()
  idModel:number;

  @IsNumber()
  idProductType:number;

  @IsString()
  name:string;

  @IsString()
  description:string;

  @IsNumber()  
  price:number;

  @IsNumber()
  quantity:number;

  @IsUrl()
  imageUrl:string;
}
