import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from '@/entities/store.entity';
import { CreateStoreDto } from '@/common/dto/create-store.dto'; 
import { UpdateStoreDto } from '@/common/dto/update-store.dto'; 

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private repo: Repository<Store>
  ) {}

  async create(dto: CreateStoreDto) {
    const s = this.repo.create(dto);
    return this.repo.save(s);
  }

  async findAll(page = 1, limit = 20, q?: string) {
    const take = Math.min(limit, 100);
    const skip = (page - 1) * take;
    const where = q ? { name: ILike(`%${q}%`), deleted: false } : { deleted: false };
    const [items, total] = await this.repo.findAndCount({
      where,
      take,
      skip,
      order: { name: 'ASC' }
    });
    return { items, total, page, limit: take };
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
    const store = await this.findOne(id);
    store.deleted = true;
    return this.repo.save(store);
  }
}
