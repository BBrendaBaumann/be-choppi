import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { UsersModule } from './modules/users/users.module'; 
import { AuthModule } from './modules/auth/auth.module'; 
import { StoresModule } from './modules/stores/stores.module'; 
import { ProductsModule } from './modules/products/products.module'; 
import { StoreProductsModule } from './modules/store-products/store-products.module'; 
import { CartModule } from './modules/cart/cart.module'; 
import * as dotenv from 'dotenv';
import { User } from './entities/user.entity'; 
import { Store } from './entities/store.entity'; 
import { Product } from './entities/product.entity'; 
import { StoreProduct } from './entities/store-product.entity'; 

dotenv.config();

const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'choppi',
  entities: [User, Store, Product, StoreProduct],
  synchronize: false, //!TypeORM con synchronize: true intenta reescribir o alterar la tabla users para que coincida con tu entity.
  migrationsRun: true,
  migrations: ['dist/migrations/*.js'],
  logging: false
};

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    AuthModule,
    StoresModule,
    ProductsModule,
    StoreProductsModule,
    CartModule
  ]
})
export class AppModule {}
