import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?:string;
  
  @IsOptional()
  @IsString()
  description?:string;
  
  @IsOptional()
  @IsNumber()  
  price?:number;
  
  @IsOptional()
  @IsNumber()
  quantity?:number;
  
  @IsOptional()
  @IsUrl()
  imageUrl?:string;
}
