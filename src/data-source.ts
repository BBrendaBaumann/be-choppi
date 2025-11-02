import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity'; 
import { Store } from './entities/store.entity'; 
import { Product } from './entities/product.entity'; 
import { StoreProduct } from './entities/store-product.entity'; 

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'choppi',
  entities: [User, Store, Product, StoreProduct],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
  logging: false
});
