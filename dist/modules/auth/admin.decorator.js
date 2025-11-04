"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADMIN_KEY = void 0;
exports.AdminOnly = AdminOnly;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const swagger_1 = require("@nestjs/swagger");
exports.ADMIN_KEY = 'isAdmin';
function AdminOnly() {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)(exports.ADMIN_KEY, true), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, swagger_1.ApiBearerAuth)());
}
