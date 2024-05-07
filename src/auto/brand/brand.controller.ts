import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandDto } from './dto/brand.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  create(@Body() {brand}: BrandDto) {
    return this.brandService.create(brand);
  }

  @Get()
  findAll() {
    return this.brandService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.brandService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() {brand}:BrandDto) {
    return this.brandService.update(+id, brand);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.brandService.remove(+id);
  }
}
