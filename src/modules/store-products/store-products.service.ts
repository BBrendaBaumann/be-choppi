import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { StoreProduct } from '@/entities/store-product.entity'; 
import { CreateStoreProductDto } from '@/common/dto/create-storeproduct.dto';
import { UpdateStoreProductDto } from '@/common/dto/update-storeproduct.dto'; 
import { StoresService } from '../stores/stores.service';
import { ProductsService } from '../products/products.service';
import { FindAllQuery } from './interfaces/sp.interface';

@Injectable()
export class StoreProductsService {
  constructor(
    @InjectRepository(StoreProduct)
    private repo: Repository<StoreProduct>,
    private storesSvc: StoresService,
    private productsSvc: ProductsService
  ) {}

  async create(storeId: number, dto: CreateStoreProductDto) {
    const store = await this.storesSvc.findOne(storeId);
    const product = await this.productsSvc.findOne(dto.productId);
    const sp = this.repo.create({ store, product, price: dto.price, stock: dto.stock });
    return this.repo.save(sp);
  }

  async findAll(
    storeId: number,
    query?: FindAllQuery,
  ): Promise<{ items: StoreProduct[]; total: number; page: number; lastPage: number }> {
    const page = query?.page && query.page > 0 ? query.page : 1;
    const limit = query?.limit && query.limit > 0 ? query.limit : 20;
    const skip = (page - 1) * limit;

    const qb = this.repo
      .createQueryBuilder('sp')
      .leftJoinAndSelect('sp.product', 'product')
      .where('sp.storeId = :storeId', { storeId });

    if (query?.inStock) {
      qb.andWhere('sp.stock > 0');
    }

    if (query?.q) {
      qb.andWhere('product.name ILIKE :q', { q: `%${query.q}%` });
    }

    qb.skip(skip).take(limit).orderBy('sp.id', 'ASC');

    const [items, total] = await qb.getManyAndCount();

    return {
      items,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async update(storeId: number, spId: number, dto: UpdateStoreProductDto): Promise<StoreProduct> {
    const sp = await this.repo.findOne({
      where: { id: spId },
      relations: ['store'],
    });

    if (!sp || sp.store.id !== storeId) {
      throw new NotFoundException('StoreProduct not found');
    }

    if (dto.price !== undefined) sp.price = dto.price;
    if (dto.stock !== undefined) sp.stock = dto.stock;

    return this.repo.save(sp);
  }

  async remove(storeId: number, spId: number) {
  const sp = await this.repo.findOne({
    where: { id: spId, store: { id: storeId }, deleted: false },
    relations: ['store'],
  });

  if (!sp) throw new NotFoundException('StoreProduct not found');

  sp.deleted = true;
  return this.repo.save(sp);
}

}
