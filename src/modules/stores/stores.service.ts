import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from '@/entities/store.entity';
import { CreateStoreDto } from '@/common/dto/create-store.dto'; 
import { UpdateStoreDto } from '@/common/dto/update-store.dto'; 

@Injectable()
export class StoresService {
  private readonly logger = new Logger(StoresService.name);
  constructor(
    @InjectRepository(Store)
    private repo: Repository<Store>
  ) {}

  async create(dto: CreateStoreDto) {
    const s = this.repo.create(dto);
    return this.repo.save(s);
  }

  async findAll(query?: { page?: number; limit?: number; q?: string }) {
  const page = query?.page && query.page > 0 ? query.page : 1;
  const limit = query?.limit && query.limit > 0 ? query.limit : 20;
  const skip = (page - 1) * limit;

  const where: any = { deleted: false }; 
  
  if (query?.q) {
    where.name = ILike(`%${query.q}%`);
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

  async findOne(id: number) {
    const store = await this.repo.findOne({ where: { id, deleted: false } });
    if (!store) throw new NotFoundException('Store not found');
    return store;
  }

  async update(id: number, dto: UpdateStoreDto) {
    const store = await this.findOne(id);
    Object.assign(store, dto);
    return this.repo.save(store);
  }

  async remove(id: number) {
    this.logger.log(`🗑️ Iniciando soft-delete de store ${id}`);
    
    const store = await this.repo.findOne({ where: { id } });
    
    if (!store) {
      this.logger.error(`❌ Store ${id} no encontrada`);
      throw new NotFoundException('Store not found');
    }
    
    this.logger.log(`📦 Store encontrada:`, store);
    
    store.deleted = true;
    const saved = await this.repo.save(store);
    
    this.logger.log(`✅ Store ${id} marcada como deleted:`, saved);
    
    return { success: true, id };
  }
}
