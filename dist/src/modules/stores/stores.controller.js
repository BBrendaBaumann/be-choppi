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
var StoresController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoresController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const store_entity_1 = require("../../entities/store.entity");
const stores_service_1 = require("./stores.service");
const create_store_dto_1 = require("../../common/dto/create-store.dto");
const update_store_dto_1 = require("../../common/dto/update-store.dto");
const admin_decorator_1 = require("../auth/admin.decorator");
let StoresController = StoresController_1 = class StoresController {
    constructor(svc) {
        this.svc = svc;
        this.logger = new common_1.Logger(StoresController_1.name);
    }
    async findAll(page, limit, q) {
        this.logger.log('🔵 GET /stores called');
        return this.svc.findAll({ page, limit, q });
    }
    async findOne(id) {
        this.logger.log(`🔵 GET /stores/${id} called`);
        return this.svc.findOne(id);
    }
    async create(dto) {
        return this.svc.create(dto);
    }
    async update(id, dto) {
        return this.svc.update(id, dto);
    }
    async remove(id) {
        this.logger.log(`🔴 DELETE /stores/${id} called`);
        return this.svc.remove(id);
    }
};
exports.StoresController = StoresController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'q', required: false, description: 'Buscar por nombre' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], StoresController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: store_entity_1.Store }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StoresController.prototype, "findOne", null);
__decorate([
    (0, admin_decorator_1.AdminOnly)(),
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({ type: create_store_dto_1.CreateStoreDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_store_dto_1.CreateStoreDto]),
    __metadata("design:returntype", Promise)
], StoresController.prototype, "create", null);
__decorate([
    (0, admin_decorator_1.AdminOnly)(),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiBody)({ type: update_store_dto_1.UpdateStoreDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_store_dto_1.UpdateStoreDto]),
    __metadata("design:returntype", Promise)
], StoresController.prototype, "update", null);
__decorate([
    (0, admin_decorator_1.AdminOnly)(),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StoresController.prototype, "remove", null);
exports.StoresController = StoresController = StoresController_1 = __decorate([
    (0, swagger_1.ApiTags)('stores'),
    (0, common_1.Controller)('stores'),
    __metadata("design:paramtypes", [stores_service_1.StoresService])
], StoresController);
