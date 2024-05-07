import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ModelService } from './model.service';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDTO } from './dto/update-model.dto';

@Controller('model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Post()
  create(@Body() {model,idBrand}: CreateModelDto) {
    return this.modelService.create(model,idBrand);
  }

  @Get()
  findAll() {
    return this.modelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: string) {
    return this.modelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() {model}:UpdateModelDTO) {
    return this.modelService.update(+id, model);
  }

  @Delete(':id')
  async remove(@Param('id',ParseIntPipe) id: number) {
    return this.modelService.remove(+id);
  }
}
