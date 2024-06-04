import { Module } from '@nestjs/common';
import { BrandModule } from './auto/brand/brand.module';
import { ModelModule } from './auto/model/model.module';
import { ProductTypeModule } from './auto/product-type/product-type.module';
import { ProductModule } from './auto/product/product.module';
import { SaleModule } from './sale/sale.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { config } from 'dotenv';
config();

@Module({
  imports: [BrandModule, ModelModule, ProductTypeModule, ProductModule, SaleModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
