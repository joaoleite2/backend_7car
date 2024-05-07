import { Module } from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { ProductTypeController } from './product-type.controller';
import { PrismaService } from 'src/prisma/prisma-service';

@Module({
  controllers: [ProductTypeController],
  providers: [ProductTypeService,PrismaService],
})
export class ProductTypeModule {}
