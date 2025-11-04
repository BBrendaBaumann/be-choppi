import { CanActivate, ExecutionContext, Injectable, ForbiddenException, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ADMIN_KEY } from '@/modules/auth/admin.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiresAdmin = this.reflector.getAllAndOverride<boolean>(ADMIN_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiresAdmin) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    this.logger.log(`👤 Usuario en request:`, user);
    this.logger.log(`🔐 Requiere admin: ${requiresAdmin}`);

    if (!user) {
      throw new ForbiddenException('No authenticated user');
    }

    if (!user.isAdmin) {
      throw new ForbiddenException('Admin access required');
    }

    return true;
  }
}