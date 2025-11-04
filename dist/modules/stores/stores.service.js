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
var StoresService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoresService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const store_entity_1 = require("../../entities/store.entity");
let StoresService = StoresService_1 = class StoresService {
    constructor(repo) {
        this.repo = repo;
        this.logger = new common_1.Logger(StoresService_1.name);
    }
    async create(dto) {
        const s = this.repo.create(dto);
        return this.repo.save(s);
    }
    async findAll(query) {
        const page = query?.page && query.page > 0 ? query.page : 1;
        const limit = query?.limit && query.limit > 0 ? query.limit : 20;
        const skip = (page - 1) * limit;
        const where = { deleted: false };
        if (query?.q) {
            where.name = (0, typeorm_1.ILike)(`%${query.q}%`);
        }
        this.logger.log('🔍 Buscando stores con WHERE:', where);
        const [items, total] = await this.repo.findAndCount({
            where,
            skip,
            take: limit,
            order: { id: 'DESC' },
        });
        this.logger.log(`✅ Encontrados ${items.length} stores de ${total} totales`);
        return {
            items,
            total,
            page,
            lastPage: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        const store = await this.repo.findOne({ where: { id, deleted: false } });
        if (!store)
            throw new common_1.NotFoundException('Store not found');
        return store;
    }
    async update(id, dto) {
        const store = await this.findOne(id);
        Object.assign(store, dto);
        return this.repo.save(store);
    }
    async remove(id) {
        this.logger.log(`🗑️ Iniciando soft-delete de store ${id}`);
        const store = await this.repo.findOne({ where: { id } });
        if (!store) {
            this.logger.error(`❌ Store ${id} no encontrada`);
            throw new common_1.NotFoundException('Store not found');
        }
        this.logger.log(`📦 Store encontrada:`, store);
        store.deleted = true;
        const saved = await this.repo.save(store);
        this.logger.log(`✅ Store ${id} marcada como deleted:`, saved);
        return { success: true, id };
    }
};
exports.StoresService = StoresService;
exports.StoresService = StoresService = StoresService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(store_entity_1.Store)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], StoresService);
