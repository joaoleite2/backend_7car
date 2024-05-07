import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { ProductTypeDto } from './dto/product-type.dto';

@Controller('product-type')
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) {}

  @Post()
  create(@Body() {productType}:ProductTypeDto) {
    return this.productTypeService.create(productType);
  }

  @Get()
  findAll() {
    return this.productTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: string) {
    return this.productTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: string, @Body() {productType}:ProductTypeDto) {
    return this.productTypeService.update(+id, productType);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id:number) {
    return this.productTypeService.remove(+id);
  }
}
