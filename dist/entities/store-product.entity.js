"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreProduct = void 0;
const typeorm_1 = require("typeorm");
const store_entity_1 = require("./store.entity");
const product_entity_1 = require("./product.entity");
const swagger_1 = require("@nestjs/swagger");
let StoreProduct = class StoreProduct {
};
exports.StoreProduct = StoreProduct;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StoreProduct.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.ManyToOne)(() => store_entity_1.Store, store => store.storeProducts, { onDelete: 'CASCADE' }),
    __metadata("design:type", store_entity_1.Store)
], StoreProduct.prototype, "store", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, product => product.storeProducts, { eager: true, onDelete: 'CASCADE' }),
    __metadata("design:type", product_entity_1.Product)
], StoreProduct.prototype, "product", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)('decimal', { precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], StoreProduct.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)('int', { default: 0 }),
    __metadata("design:type", Number)
], StoreProduct.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], StoreProduct.prototype, "deleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], StoreProduct.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], StoreProduct.prototype, "updatedAt", void 0);
exports.StoreProduct = StoreProduct = __decorate([
    (0, typeorm_1.Entity)({ name: 'store_products' })
], StoreProduct);
