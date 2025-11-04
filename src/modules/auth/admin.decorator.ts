import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'; 
import { RolesGuard } from '@/common/guards/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

export const ADMIN_KEY = 'isAdmin';

export function AdminOnly() {
   return applyDecorators(
    SetMetadata(ADMIN_KEY, true),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
  );
}
  
