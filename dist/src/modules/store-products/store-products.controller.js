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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreProductsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_storeproduct_dto_1 = require("../../common/dto/create-storeproduct.dto");
const update_storeproduct_dto_1 = require("../../common/dto/update-storeproduct.dto");
const store_products_service_1 = require("./store-products.service");
const admin_decorator_1 = require("../auth/admin.decorator");
let StoreProductsController = class StoreProductsController {
    constructor(svc) {
        this.svc = svc;
    }
    async findAll(storeId, query) {
        return this.svc.findAll(storeId, query);
    }
    async create(storeId, dto) {
        return this.svc.create(storeId, dto);
    }
    async update(storeId, spId, dto) {
        return this.svc.update(storeId, spId, dto);
    }
    async remove(storeId, spId) {
        return this.svc.remove(storeId, spId);
    }
};
exports.StoreProductsController = StoreProductsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'q', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'inStock', required: false }),
    __param(0, (0, common_1.Param)('storeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], StoreProductsController.prototype, "findAll", null);
__decorate([
    (0, admin_decorator_1.AdminOnly)(),
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({ type: create_storeproduct_dto_1.CreateStoreProductDto }),
    __param(0, (0, common_1.Param)('storeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_storeproduct_dto_1.CreateStoreProductDto]),
    __metadata("design:returntype", Promise)
], StoreProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':spId'),
    (0, swagger_1.ApiBody)({ type: update_storeproduct_dto_1.UpdateStoreProductDto }),
    __param(0, (0, common_1.Param)('storeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('spId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, update_storeproduct_dto_1.UpdateStoreProductDto]),
    __metadata("design:returntype", Promise)
], StoreProductsController.prototype, "update", null);
__decorate([
    (0, admin_decorator_1.AdminOnly)(),
    (0, common_1.Delete)(':spId'),
    __param(0, (0, common_1.Param)('storeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('spId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], StoreProductsController.prototype, "remove", null);
exports.StoreProductsController = StoreProductsController = __decorate([
    (0, swagger_1.ApiTags)('store-products'),
    (0, common_1.Controller)('stores/:storeId/products'),
    __metadata("design:paramtypes", [store_products_service_1.StoreProductsService])
], StoreProductsController);
