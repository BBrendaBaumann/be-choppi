import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiBody, ApiQuery } from '@nestjs/swagger';
import { CreateStoreProductDto } from '@/common/dto/create-storeproduct.dto'; 
import { UpdateStoreProductDto } from '@/common/dto/update-storeproduct.dto'; 
import { StoreProductsService } from './store-products.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'; 
import { AdminOnly } from '../auth/admin.decorator';

@ApiTags('store-products')
@Controller('stores/:storeId/products')
export class StoreProductsController {
  constructor(private svc: StoreProductsService) {}
  
  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'q', required: false })
  @ApiQuery({ name: 'inStock', required: false })
  async findAll(
    @Param('storeId', ParseIntPipe) storeId: number,
    @Query()
    query: { page?: number; limit?: number; q?: string; inStock?: boolean },
  ) {
    return this.svc.findAll(storeId, query);
  }

  @AdminOnly()
  @Post()
  @ApiBody({ type: CreateStoreProductDto })
  async create(@Param('storeId', ParseIntPipe) storeId: number, @Body() dto: CreateStoreProductDto) {
    return this.svc.create(storeId, dto);
  }

  @Put(':spId')
  @ApiBody({ type: UpdateStoreProductDto })
  async update(@Param('storeId', ParseIntPipe) storeId: number, @Param('spId', ParseIntPipe) spId: number, @Body() dto: UpdateStoreProductDto) {
    return this.svc.update(storeId, spId, dto);
  }

  @AdminOnly()
  @Delete(':spId')
  async remove(@Param('storeId', ParseIntPipe) storeId: number, @Param('spId', ParseIntPipe) spId: number) {
    return this.svc.remove(storeId, spId);
  }
}
