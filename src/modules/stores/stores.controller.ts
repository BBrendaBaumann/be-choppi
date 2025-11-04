import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, Logger } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'; 
import { Store } from '@/entities/store.entity';
import { StoresService } from './stores.service'; 
import { CreateStoreDto } from '@/common/dto/create-store.dto'; 
import { UpdateStoreDto } from '@/common/dto/update-store.dto'; 
import { AdminOnly } from '../auth/admin.decorator';

@ApiTags('stores')
@Controller('stores')
export class StoresController {
  private readonly logger = new Logger(StoresController.name);
  constructor(private svc: StoresService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'q', required: false, description: 'Buscar por nombre' })
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('q') q?: string,
  ) {
    this.logger.log('🔵 GET /stores called');
    return this.svc.findAll({ page, limit, q });
  }

  @Get(':id')
  @ApiOkResponse({ type: Store })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    this.logger.log(`🔵 GET /stores/${id} called`);
    return this.svc.findOne(id);
  }

  @AdminOnly()
  @Post()
  @ApiBody({ type: CreateStoreDto })
  async create(@Body() dto: CreateStoreDto) {
    return this.svc.create(dto);
  }

  @AdminOnly()
  @Put(':id')
  @ApiBody({ type: UpdateStoreDto })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateStoreDto) {
    return this.svc.update(id, dto);
  }

  @AdminOnly()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    this.logger.log(`🔴 DELETE /stores/${id} called`);
    return this.svc.remove(id);
  }
}
