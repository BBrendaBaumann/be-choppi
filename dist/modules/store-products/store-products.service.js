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
exports.StoreProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const store_product_entity_1 = require("../../entities/store-product.entity");
const stores_service_1 = require("../stores/stores.service");
const products_service_1 = require("../products/products.service");
let StoreProductsService = class StoreProductsService {
    constructor(repo, storesSvc, productsSvc) {
        this.repo = repo;
        this.storesSvc = storesSvc;
        this.productsSvc = productsSvc;
    }
    async create(storeId, dto) {
        const store = await this.storesSvc.findOne(storeId);
        const product = await this.productsSvc.findOne(dto.productId);
        const sp = this.repo.create({ store, product, price: dto.price, stock: dto.stock });
        return this.repo.save(sp);
    }
    async findAll(storeId, query) {
        const page = query?.page && query.page > 0 ? query.page : 1;
        const limit = query?.limit && query.limit > 0 ? query.limit : 20;
        const skip = (page - 1) * limit;
        const qb = this.repo
            .createQueryBuilder('sp')
            .leftJoinAndSelect('sp.product', 'product')
            .where('sp.storeId = :storeId', { storeId })
            .andWhere('sp.deleted = :deleted', { deleted: false });
        if (query?.inStock) {
            qb.andWhere('sp.stock > 0');
        }
        if (query?.q) {
            qb.andWhere('product.name ILIKE :q', { q: `%${query.q}%` });
        }
        qb.skip(skip).take(limit).orderBy('sp.id', 'ASC');
        const [items, total] = await qb.getManyAndCount();
        return {
            items,
            total,
            page,
            lastPage: Math.ceil(total / limit),
        };
    }
    async update(storeId, spId, dto) {
        const sp = await this.repo.findOne({
            where: { id: spId },
            relations: ['store'],
        });
        if (!sp || sp.store.id !== storeId) {
            throw new common_1.NotFoundException('StoreProduct not found');
        }
        if (dto.price !== undefined)
            sp.price = dto.price;
        if (dto.stock !== undefined)
            sp.stock = dto.stock;
        return this.repo.save(sp);
    }
    async remove(storeId, spId) {
        const sp = await this.repo.findOne({
            where: { id: spId, store: { id: storeId }, deleted: false },
            relations: ['store'],
        });
        if (!sp)
            throw new common_1.NotFoundException('StoreProduct not found');
        sp.deleted = true;
        return this.repo.save(sp);
    }
};
exports.StoreProductsService = StoreProductsService;
exports.StoreProductsService = StoreProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(store_product_entity_1.StoreProduct)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        stores_service_1.StoresService,
        products_service_1.ProductsService])
], StoreProductsService);
