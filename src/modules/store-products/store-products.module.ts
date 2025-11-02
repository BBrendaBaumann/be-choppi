import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreProduct } from '@/entities/store-product.entity'; 
import { StoresModule } from '../stores/stores.module'; 
import { ProductsModule } from '../products/products.module';
import { StoreProductsService } from './store-products.service'; 
import { StoreProductsController } from './store-products.controller'; 

@Module({
  imports: [TypeOrmModule.forFeature([StoreProduct]), StoresModule, ProductsModule],
  providers: [StoreProductsService],
  controllers: [StoreProductsController]
})
export class StoreProductsModule {}
