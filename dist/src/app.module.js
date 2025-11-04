"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const users_module_1 = require("./modules/users/users.module");
const auth_module_1 = require("./modules/auth/auth.module");
const stores_module_1 = require("./modules/stores/stores.module");
const products_module_1 = require("./modules/products/products.module");
const store_products_module_1 = require("./modules/store-products/store-products.module");
const cart_module_1 = require("./modules/cart/cart.module");
const dotenv = require("dotenv");
const user_entity_1 = require("./entities/user.entity");
const store_entity_1 = require("./entities/store.entity");
const product_entity_1 = require("./entities/product.entity");
const store_product_entity_1 = require("./entities/store-product.entity");
dotenv.config();
const typeOrmConfig = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'choppi',
    entities: [user_entity_1.User, store_entity_1.Store, product_entity_1.Product, store_product_entity_1.StoreProduct],
    synchronize: false,
    migrations: ['dist/migrations/*.js'],
    logging: false
};
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot(typeOrmConfig),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            stores_module_1.StoresModule,
            products_module_1.ProductsModule,
            store_products_module_1.StoreProductsModule,
            cart_module_1.CartModule
        ]
    })
], AppModule);
