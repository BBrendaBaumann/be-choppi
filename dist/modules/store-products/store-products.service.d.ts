import { Repository } from 'typeorm';
import { StoreProduct } from '@/entities/store-product.entity';
import { CreateStoreProductDto } from '@/common/dto/create-storeproduct.dto';
import { UpdateStoreProductDto } from '@/common/dto/update-storeproduct.dto';
import { StoresService } from '../stores/stores.service';
import { ProductsService } from '../products/products.service';
import { FindAllQuery } from './interfaces/sp.interface';
export declare class StoreProductsService {
    private repo;
    private storesSvc;
    private productsSvc;
    constructor(repo: Repository<StoreProduct>, storesSvc: StoresService, productsSvc: ProductsService);
    create(storeId: number, dto: CreateStoreProductDto): Promise<StoreProduct>;
    findAll(storeId: number, query?: FindAllQuery): Promise<{
        items: StoreProduct[];
        total: number;
        page: number;
        lastPage: number;
    }>;
    update(storeId: number, spId: number, dto: UpdateStoreProductDto): Promise<StoreProduct>;
    remove(storeId: number, spId: number): Promise<StoreProduct>;
}
