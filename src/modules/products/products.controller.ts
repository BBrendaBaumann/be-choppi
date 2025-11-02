import { Body, Controller, Get, Param, Post, Query,  UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from '@/common/dto/create-product.dto'; 
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { Product } from '@/entities/product.entity';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private svc: ProductsService) {}

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.svc.findOne(id);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'q', required: false })
  async findAll(@Query() query: { page?: number; limit?: number; q?: string }) {
    return this.svc.findAll(query);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({ type: CreateProductDto })
  async create(@Body() dto: CreateProductDto): Promise<Product> {
    return this.svc.create(dto);
  }
}
