import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Product } from '@/entities/product.entity'; 
import { CreateProductDto } from '@/common/dto/create-product.dto'; 

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  async create(dto: CreateProductDto) {
    const p = this.repo.create(dto);
    return this.repo.save(p);
  }

  async findOne(id: number) {
    const p = await this.repo.findOne({ where: { id } });
    if (!p) throw new NotFoundException('Product not found');
    return p;
  }

  async findAll(query?: { page?: number; limit?: number; q?: string ; sort?: 'ASC' | 'DESC'}) {
    const page = query?.page && query.page > 0 ? query.page : 1;
    const limit = query?.limit && query.limit > 0 ? query.limit : 20;
    const skip = (page - 1) * limit;

    const where: any = { deleted: false };
if (query?.q) where.name = ILike(`%${query.q}%`);


    const [items, total] = await this.repo.findAndCount({
      where,
      skip,
      take: limit,
      order: { id: query?.sort === 'DESC' ? 'DESC' : 'ASC' },
    });

    return {
      items,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async update(id: number, dto: Partial<CreateProductDto>) {
  const product = await this.repo.findOne({ where: { id } });
  if (!product) throw new NotFoundException('Product not found');

  Object.assign(product, dto);
  return this.repo.save(product);
}

async remove(id: number) {
  const product = await this.repo.findOne({ where: { id } });
  if (!product) throw new NotFoundException('Product not found');
  product.deleted = true;
  await this.repo.save(product);
  return { success: true, id };
}
}
