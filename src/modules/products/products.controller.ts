import { Body, Controller, Get, Param, ParseIntPipe,Put, Post, Query,  UseGuards, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from '@/common/dto/create-product.dto'; 
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { Product } from '@/entities/product.entity';
import { AdminOnly } from '../auth/admin.decorator';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private svc: ProductsService) {}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.svc.findOne(id);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'q', required: false })
  async findAll(@Query() query: { page?: number; limit?: number; q?: string }) {
    return this.svc.findAll(query);
  }
 
  @AdminOnly()
  @Post()
  @ApiBody({ type: CreateProductDto })
  async create(@Body() dto: CreateProductDto): Promise<Product> {
    return this.svc.create(dto);
  }

@AdminOnly()
@Put(':id')
@ApiBody({ type: CreateProductDto })
async update(
  @Param('id', ParseIntPipe) id: number,
  @Body() dto: Partial<CreateProductDto>,
): Promise<Product> {
  return this.svc.update(id, dto);

}

@AdminOnly()
@Delete(':id')
async remove(@Param('id', ParseIntPipe) id: number) {
  return this.svc.remove(id);
}

}
