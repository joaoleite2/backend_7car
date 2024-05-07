import { IsString } from "class-validator";

export class ProductTypeDto {
  @IsString()
  productType:string;
}
