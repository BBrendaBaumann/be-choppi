"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv = require("dotenv");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const store_entity_1 = require("./entities/store.entity");
const product_entity_1 = require("./entities/product.entity");
const store_product_entity_1 = require("./entities/store-product.entity");
dotenv.config();
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'choppi',
    entities: [user_entity_1.User, store_entity_1.Store, product_entity_1.Product, store_product_entity_1.StoreProduct],
    migrations: ['dist/migrations/*.js'],
    synchronize: false,
    logging: false
});
