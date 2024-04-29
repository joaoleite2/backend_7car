import { Module } from '@nestjs/common';
import { BrandModule } from './auto/brand/brand.module';
import { ModelModule } from './auto/model/model.module';
import { ProductTypeModule } from './auto/product-type/product-type.module';
import { ProductModule } from './auto/product/product.module';

@Module({
  imports: [BrandModule, ModelModule, ProductTypeModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
