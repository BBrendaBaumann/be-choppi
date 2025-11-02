import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'; 
import { Store } from '@/entities/store.entity';
import { StoresService } from './stores.service'; 
import { CreateStoreDto } from '@/common/dto/create-store.dto'; 
import { UpdateStoreDto } from '@/common/dto/update-store.dto'; 

@ApiTags('stores')
@Controller('stores')
export class StoresController {
  constructor(private svc: StoresService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'q', required: false, description: 'Buscar por nombre' })
  async findAll(@Query('page') page = '1', @Query('limit') limit = '20', @Query('q') q?: string) {
    return this.svc.findAll(Number(page), Number(limit), q);
  }

  @Get(':id')
  @ApiOkResponse({ type: Store })
  async findOne(@Param('id') id: number) {
    return this.svc.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({ type: CreateStoreDto })
  async create(@Body() dto: CreateStoreDto) {
    return this.svc.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiBody({ type: UpdateStoreDto })
  async update(@Param('id') id: number, @Body() dto: UpdateStoreDto) {
    return this.svc.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.svc.remove(id);
  }
}
